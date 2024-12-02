const express = require("express");
const prisma = require('../prisma');
const asyncHandler = require('../middleware/asyncHandler');
const router = express.Router();

router.get('/top', asyncHandler(getBookWithHighestIncome))
router.get('/', asyncHandler(getAllSales));
router.get('/:id', asyncHandler(getSpecificSale));
router.get('/book/:isbn', asyncHandler(getAllSalesSpecificBook));
router.get('/date/:date', asyncHandler(getSalesByDate));

async function getAllSales (req, res) {
    const ventas = await prisma.venta.findMany();
    return res.json(ventas);
}

async function getSpecificSale(req, res) {
    const venta = await prisma.venta.findUnique({
        where: {
            ID_Venta: Number(req.params.id)
        }
    });
    return res.json(venta);
}

async function getAllSalesSpecificBook(req, res) {
    const venta = await prisma.venta.findMany({
        where: {
            ISBN: req.params.isbn
        }
    });
    return res.json(venta);
}

async function getSalesByDate(req, res) {
    const date = new Date(req.params.date);

    const venta = await prisma.venta.findMany({
        where: {
            Fecha_Venta: date
        }
    });
    return res.json(venta);
}

//nope
async function getBookWithHighestIncome(req, res) {
    res.json({})
}

module.exports = router;
