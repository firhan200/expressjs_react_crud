import express from 'express';
import {
    get,
    submit,
    update, 
    remove
} from './../controllers/user.controller.js';

const userRouter = express.Router();

/* GET programming languages. */
userRouter.get('/', get);

userRouter.get('/:id', get);

/* POST programming language */
userRouter.post('/', submit);

/* PUT programming language */
userRouter.put('/:id', update);

/* DELETE programming language */
userRouter.delete('/:id', remove);

export default userRouter;