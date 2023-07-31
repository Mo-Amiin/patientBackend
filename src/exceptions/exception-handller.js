
export default function exceptionHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    console.log(err.stack);
    res.status(err.statusCode ?? 500).json({
            message: err.message,
            success: false,
        })
  }


// export default function exceptionHandler(error, req, res, next) {
//     res.status(error?.statusCode ?? 500).json({
//       message: error.message,
//       success: false,
//     });
//   }