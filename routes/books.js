const express = require('express');
const prisma = require('../prisma');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

router.get('/with-sales', asyncHandler(getBooksWithSales));
router.get('/', asyncHandler(getAllBooks));
router.get('/:isbn', asyncHandler(getSpecificBook));
router.get('/author/:author', asyncHandler(getAuthorBooks));
router.get('/price/:price', asyncHandler(getBooksPriceGreaterThan));



async function getAllBooks(req, res) {
    const books = await prisma.libro.findMany();
    return res.json(books);
}

async function getSpecificBook(req, res) {
    const books = await prisma.libro.findUnique({
        where: {
            ISBN: req.params.isbn
        }
    });
    return res.json(books);
}

async function getAuthorBooks(req, res) {
    const books = await prisma.libro.findMany({
        where: {
            Autor: req.params.author
        }
    });
    return res.json(books);
}

async function getBooksPriceGreaterThan(req, res) {
    const books = await prisma.libro.findMany({
        where: {
            Precio: { gt: Number(req.params.price)}
        }
    });
    return res.json(books);
}
//saco los libros que tienen alguna venta y muestro la id del ibro y la id de las ventas de ese libro.
async function getBooksWithSales(req, res) {
    const books = await prisma.libro.findMany({
        where: {
            Ventas: {
                some: {},
            }
        },
        select: {
            ISBN: true,
            Ventas: {
                select: {
                    ID_Venta: true,
                }
            }
        }
    });

    return res.json(books);
}

module.exports = router;
