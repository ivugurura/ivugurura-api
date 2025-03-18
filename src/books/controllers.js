// import path from "path";
import { createReadStream, existsSync, unlinkSync } from "fs";
import {
  filePathsMap,
  QueryHelper,
  serverResponse,
  systemRoles,
} from "../helpers";
import { Book, BookCategory } from "../models";
import slugify from "slugify";

const bookTb = new QueryHelper(Book);
const categoryTb = new QueryHelper(BookCategory);
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const registerBook = async (req, res) => {
  const { bookFile, bookCover, ...rest } = req.body;

  const book = await bookTb.create({
    url: bookFile,
    coverImage: bookCover,
    slug: slugify(rest.name),
    userId: req.user.id,
    ...rest,
  });

  return serverResponse(res, 200, "Success", book);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getBooks = async (req, res) => {
  const { languageId } = req.body;
  const books = await bookTb.findAll({ languageId });
  return serverResponse(res, 200, "Success", books);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export const getBookCategories = async (req, res) => {
  const { languageId } = req.body;
  const categories = await categoryTb.findAll({ languageId });
  return serverResponse(res, 200, "Success", categories);
};

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const readBook = async (req, res) => {
  const book = req.body.entity;

  const filePath = `${filePathsMap.bookFile}/${book?.url}`;

  if (!existsSync(filePath)) {
    return serverResponse(res, 404, "Book not found");
  }

  res.setHeader("Content-Type", "application/pdf");
  if (!book.isDownloadable) {
    res.setHeader("Content-Disposition", "inline"); // Forces viewing, not downloading
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Referrer-Policy", "no-referrer");
  }

  const fileStream = createReadStream(filePath);
  return fileStream.pipe(res);
};

export const deleteBook = async (req, res) => {
  const book = req.body.entity;
  if (req.user.role === systemRoles.editor && book.userId !== req.user.id) {
    return serverResponse(res, 401, "You are not allowed to delete the book");
  }

  const filePath = `${filePathsMap.bookFile}/${book?.url}`;
  const coverPath = `${filePathsMap.bookCover}/${book?.coverImage}`;
  if (existsSync(filePath) && existsSync(coverPath)) {
    unlinkSync(filePath);
    unlinkSync(coverPath);
  }
  await bookTb.delete({ id: book.id });
  return serverResponse(res, 200, "Book deleted successfully");
};

export const downloadBook = async (req, res) => {
  const book = req.body.entity;

  if (!book.isDownloadable) {
    return serverResponse(res, 401, "You are not allowed to download the book");
  }

  const filePath = `${filePathsMap.bookFile}/${book?.url}`;

  if (!existsSync(filePath)) {
    return serverResponse(res, 404, "Book not found");
  }
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${book?.name}"`);
  const fileStream = createReadStream(filePath);
  return fileStream.pipe(res);
};
