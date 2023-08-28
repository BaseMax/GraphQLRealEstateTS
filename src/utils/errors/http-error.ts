export const ErrorName = {
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    SERVER_ERROR: 'SERVER_ERROR' , 
    PASSWORD_ERROR : 'PASSWORD_ERROR' , 
    EXIST_ERROR : 'EXIST_ERROR' , 
    INVALID_USERNAME : 'INVALID_USERNAME' , 
    UNAUTHORIZED : 'UNAUTHORIZED' ,
    FORBIDDEN : 'FORBIDDEN' , 
    NOTFOUND : 'NOTFOUND'
}
  

export const ErrorType = {
    "USER_ALREADY_EXISTS": {
      message: 'User is already exists.',
      statusCode: 403
    },
    "SERVER_ERROR": {
      message: 'Server error.',
      statusCode: 500
    } , 
    "PASSWORD_ERROR" : {
      message : 'Password is invalid' , 
      statusCode : 400
    } , 
    "EXIST_ERROR" : {
      message : 'Item alredy exist' , 
      statusCode : 400 
    } , 
    "INVALID_USERNAME" : {
      message : 'Username is invalid' , 
      statusCode : 400 
    } , 
    "UNAUTHORIZED" : {
      message : 'Unauthorized' , 
      statusCode : 401
    } , 
    "FORBIDDEN" : {
      message : 'Dont have permission to access' ,
      statusCode : 403 ,
    } , 
    "NOTFOUND" : {
      message : 'Item not found' , 
      statusCode : 404 
    }
}


export const getErrorCode = errorName => {
  return ErrorType[errorName]
}