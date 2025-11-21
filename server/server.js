import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';

import { clerkMiddleware } from '@clerk/express';
import { transformSync } from "@babel/core";
import tracerPlugin from "./babel-tracer.js"; // Ensure .js extension if using native ES modules
import vm from "vm";
import bodyParser from "body-parser";

import userRoutes from './routes/users.routes.js';
import fileRoutes from './routes/files.routes.js';

const app = express();

// CORS setup
const origins = (process.env.CLIENT_URL || '').split(',').filter(Boolean);
app.use(
  cors({
    origin:  ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true, // ✅ allow cookies / auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ✅ Register Clerk middleware ONCE
app.use(clerkMiddleware());

// Public route
app.get('/health', (req, res) => res.json({ ok: true }));

// Protected routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// Js engine

app.use(cors());
app.use(bodyParser.json());

// --- HELPER FUNCTION 2: FILTER AND CLEAN THE FRAMES ---
/**
 * Processes a single execution run into a clean, de-duplicated, and context-rich
 * sequence of frames for the visualizer.
 *
 * @param {Array<Object>} executionRun - The block of logs for a single run.
 * @returns {Array<Object>} A clean array of visualization frames.
 */
function filterLogs(executionRun) {
  if (!executionRun || executionRun.length === 0) {
    return [];
  }

  const frames = [];
  let currentState = {};
  let lastPushedState = null;
  let pendingContext = null;

  for (const log of executionRun) {
    // Accumulate state from args and locals
    if (log.action === 'call' && log.args) {
      currentState = { ...currentState, ...log.args };
    }
    if (log.locals) {
      currentState = { ...currentState, ...log.locals };
    }

    // Capture context from 'test' actions
    if (log.action === 'test') {
      pendingContext = `Tested "${log.expression}": ${log.result}`;
      continue;
    }

    // Decide whether to create a new frame
    const isSignificantAction = ['call', 'return', 'stdout'].includes(log.action);
    const stateHasChanged = JSON.stringify(currentState) !== lastPushedState;

    if (isSignificantAction || stateHasChanged) {
      const newFrame = {
        action: log.action,
        line: log.line,
        locals: JSON.parse(JSON.stringify(currentState)),
      };

      if (pendingContext) {
        newFrame.action = `${log.action} (after test)`;
        newFrame.context = pendingContext;
        pendingContext = null;
      }
      
      if (log.action === 'return') newFrame.returnValue = log.value;
      if (log.action === 'stdout') newFrame.output = log.output;

      frames.push(newFrame);
      lastPushedState = JSON.stringify(currentState);
    }
  }

  return frames;
}


// --- API ENDPOINT ---
app.post("/api/code/run", (req, res) => {
  const { code } = req.body;
  let finalFrames = [];

  try {
    // 1. Instrument the user's code with the Babel tracer plugin
    const { code: instrumented } = transformSync(code, {
      plugins: [tracerPlugin],
      parserOpts: { sourceType: "module", allowReturnOutsideFunction: true },
    });

    // 2. Prepare a sandboxed environment to execute the code safely
    const sandbox = { module: {}, console };
    vm.createContext(sandbox);
    
    // The code is wrapped to capture logs and provide helper functions
    const wrappedCode = `
      const __logs = [];
      function __log(e) { __logs.push(e); }
      function __clone(val) { /* A simple clone implementation */
        try { return JSON.parse(JSON.stringify(val)); } catch(e) { return val; }
      }
      ${instrumented}
      module.exports = __logs;
    `;

    // 3. Execute the code and get the raw logs
    vm.runInContext(wrappedCode, sandbox);
    const rawLogs = sandbox.module.exports;

    finalFrames = filterLogs(rawLogs); // For now, just show everything

  } catch (err) {
    // If anything goes wrong, send an error frame
    finalFrames = [{ error: err.message, locals: {} }];
  }

  console.log("Sending Final Frames to Client:", finalFrames);
  res.json({ logs: finalFrames });
});

// Till here

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () =>
    console.log(`✅ API running at http://localhost:${PORT}`)
  );
})();
