const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDatabase = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

// Load backend/.env explicitly
dotenv.config({ path: path.resolve(__dirname, '.env'), override: true });

const env = {
	port: Number(process.env.PORT || 5000),
	clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
	nodeEnv: process.env.NODE_ENV || 'development'
};

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
	cors({
		origin: [env.clientOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
		credentials: true
	})
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/api/health', (_request, response) => {
	response.json({
		ok: true,
		service: 'assignment-backend',
		environment: env.nodeEnv
	});
});

app.use('/api/applications', applicationRoutes);
app.use(notFound);
app.use(errorHandler);

async function bootstrap() {
	await connectDatabase();

	const server = app.listen(env.port, () => {
		console.log(`Server is running on http://localhost:${env.port}`);
	});

	server.on('error', (error) => {
		if (error.code === 'EADDRINUSE') {
			console.error(`Port ${env.port} is already in use. Stop the other process or change PORT in backend/.env.`);
			process.exit(1);
		}

		throw error;
	});
}

bootstrap();
