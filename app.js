const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const authRouter = require('./src/auth/auth_routes');
const companyUsersRouter = require('./src/companey_users/company_users_routes');
const companyRouter = require('./src/company/company_routes');
const subscriptionPlansRouter = require('./src/subscription_plans/subscription_plans_routes');
const usersRouter = require('./src/users/users_routes');
const paymentsRouter = require('./src/payments/payments_routes');
const jobsRouter = require('./src/jobs/jobs_routes');
const searchesRouter = require('./src/searches/searches_routes');
const jobSeekersRouter = require('./src/Job_seekers/job_sekers_routes');
const appliedRouter = require('./src/applied/applied_routes');
const emailRoutes = require('./src/emails/emails_routes');
require('dotenv').config()



const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Update with your frontend URL for better security
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/company_users', companyUsersRouter);
app.use('/api/v1/company', companyRouter);
app.use('/api/v1/subscription_plans', subscriptionPlansRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/payments', paymentsRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use('/api/v1/search', searchesRouter);
app.use('/api/v1/jobSeekers', jobSeekersRouter);
app.use('/api/v1/applied', appliedRouter);
app.use('/api/v1/emails', emailRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
