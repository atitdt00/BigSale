import jwt from 'jsonwebtoken'
const generateToken = async (res, userId) => {
 
      const token= jwt.sign(
        {
          userId
        },
        Process.env.JWT_SECRETKEY,
        { expiresIn: "5h" }, 
      )
      return token;
}; 

export default generateToken;