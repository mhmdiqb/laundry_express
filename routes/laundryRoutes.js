const express = require('express');
const router = express.Router();

const laundryController = require('../controllers/laundryController');

const {
checkLogin,
adminOnly

}=require('../middleware/auth');


router.get('/',
checkLogin,
laundryController.dashboard
);

router.get('/transaksi', laundryController.transaksi);

router.post('/tambah', laundryController.tambahTransaksi);

router.get('/hapus/:id', laundryController.hapusTransaksi);

router.get('/edit/:id', laundryController.editPage);

router.post('/update/:id', laundryController.updateTransaksi);

router.get('/pelanggan', laundryController.pelanggan);

router.get('/laporan', laundryController.laporan);

router.get('/login', laundryController.loginPage);

router.post('/login', laundryController.loginProcess);

router.get('/logout', laundryController.logout);

router.get('/nota/:id', laundryController.notaPage);

router.get('/cek-laundry', laundryController.cekLaundryPage);

router.post('/cek-laundry', laundryController.cekLaundry);

router.get('/tracking/:id', laundryController.trackingPage);

router.get('/pelanggan/tambah', laundryController.tambahPelanggan);

module.exports = router;