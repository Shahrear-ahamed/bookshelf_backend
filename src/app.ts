import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application } from 'express'

const app: Application = express()

// corse middleware
app.use(cors())

// perse middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes

// global error handler

export default app
