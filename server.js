const PORT = 8000;
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use( cors() );
app.use( express.json() );
dotenv.config();

const genAI = new GoogleGenerativeAI( process.env.GOOGLE_GEMINI_API );

app.post( '/gemini', async ( req, res ) => {
  const model = genAI.getGenerativeModel( { model: 'gemini-2.0-flash-exp' } )

  const chat = model.startChat( {
    history: req.body.history
  } )

  const msg = req.body.message
  const result = await chat.sendMessage( msg );
  const response = await result.response;
  const text = response.text();

  res.send( text );
} )

app.listen( PORT, () => console.log( `Listening on port: ${PORT}` ) )