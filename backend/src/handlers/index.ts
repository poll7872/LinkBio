import type { Request, Response } from "express";
import slug from "slug";
import formidable from "formidable";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary"
import User from "../models/User";
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJwt } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('User already exists');
    return res.status(409).json({ error: error.message });
  }

  const handle = slug(req.body.handle, '');
  const handleExist = await User.findOne({ handle });
  if (handleExist) {
    const error = new Error('Username not available');
    return res.status(409).json({ error: error.message });
  }


  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;
  await user.save();

  res.status(201).json({ "message": "User created successfully" });
}

export const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  //Comprobar si existe user
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('User not found');
    return res.status(404).json({ error: error.message });
  }

  //Comprobar password
  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error('Incorrect password');
    return res.status(401).json({ error: error.message });
  }

  const token = generateJwt({ id: user._id })

  res.status(200).json({ token })

}

export const getUser = async (req: Request, res: Response) => {
  return res.status(200).json(req.user)
}

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body

    const handle = slug(req.body.handle, '');
    const handleExist = await User.findOne({ handle });
    if (handleExist && handleExist.email !== req.user.email) {
      const error = new Error('Username not available');
      return res.status(409).json({ error: error.message });
    }

    //Actualizar el usuario
    req.user.description = description;
    req.user.handle = handle
    req.user.links = links
    await req.user.save();

    return res.status(200).json({ message: "Profile updated successfully" });

  } catch (e) {
    const error = new Error('Error updating profile');
    return res.status(500).json({ error: error.message });
  }
}

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false })

  try {
    form.parse(req, (error, fields, files) => {

      cloudinary.uploader.upload(files.file[0].filepath, { public_id: uuid() }, async function (error, result) {
        if (error) {
          const error = new Error('Error uploading image');
          return res.status(500).json({ error: error.message });
        }
        if (result) {
          req.user.url_image = result.secure_url;
          await req.user.save()
          return res.status(200).json({ message: "Image uploaded successfully", url_image: result.secure_url });
        }
      })

    })

  } catch (error) {

  }
}

export const getUserByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params
    const user = await User.findOne({ handle }).select('-_id -__v -email -password')
    if (!user) {
      const error = new Error('User not found');
      return res.status(404).json({ error: error.message });
    }

    res.status(200).json(user)
  } catch (e) {
    const error = new Error('Error fetching user');
    return res.status(500).json({ error: error.message });
  }
}

export const searchByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.body
    const userExists = await User.findOne({ handle })
    if (userExists) {
      const error = new Error(`${handle} is already taken`);
      return res.status(409).json({ error: error.message });
    }
    res.status(200).json({ message: `${handle} is available` })
  } catch (e) {
    const error = new Error('Error getting handle');
    return res.status(500).json({ error: error.message });
  }
}
