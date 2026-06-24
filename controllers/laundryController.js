const db = require('../config/db');
const QRCode = require('qrcode');
const axios = require('axios');

exports.dashboard = (req, res) => {

    if(!req.session.user){
        return res.redirect('/login');
    }

    db.query('SELECT * FROM transaksi', (err, transaksi) => {

        if(err){
            console.log(err);
        }

        const totalTransaksi = transaksi.length;

        const pemasukan = transaksi.reduce((total, item) => {
            return total + item.harga;
        }, 0);

        res.render('dashboard', {
            transaksi,
            totalTransaksi,
            pemasukan
        });

    });

};

exports.transaksi = (req, res) => {

    if(!req.session.user){
        return res.redirect('/login');
    }

    db.query('SELECT * FROM transaksi', (err, transaksi) => {

        if(err){
            console.log(err);
        }

        res.render('transaksi', { transaksi });

    });

};

exports.tambahTransaksi = (req, res) => {

    if(!req.session.user){
        return res.redirect('/login');
    }

    const { nama, layanan, berat, status, nohp, jumlah_baju, jumlah_celana, jumlah_jaket, jumlah_kerudung, jumlah_koko, jumlah_handuk, jumlah_kemeja, jumlah_sarung, jumlah_gamis, jumlah_mukena } = req.body;

    let hargaPerKg = 7000;

    if(layanan === 'Express'){
        hargaPerKg = 15000;
    }

    const harga = berat * hargaPerKg;

    // tanggal masuk
    const tanggalMasuk = new Date();

    // estimasi selesai
    const estimasi = new Date();

    if(layanan === 'Express'){
        estimasi.setDate(estimasi.getDate() + 1);
    }else{
        estimasi.setDate(estimasi.getDate() + 3);
    }

    const sql = `
        INSERT INTO transaksi
        (
            nama,
            layanan,
            berat,
            status,
            harga,
            nohp,
            jumlah_baju,
            jumlah_celana,
            jumlah_jaket,
            jumlah_kerudung,
            jumlah_koko,
            jumlah_handuk,
            jumlah_kemeja,
            jumlah_sarung,
            jumlah_gamis,
            jumlah_mukena,
            tanggal_masuk,
            estimasi_selesai
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            nama,
            layanan,
            berat,
            status,
            harga,
            nohp,
            jumlah_baju,
            jumlah_celana,
            jumlah_jaket,
            jumlah_kerudung,
            jumlah_koko,
            jumlah_handuk,
            jumlah_kemeja,
            jumlah_sarung,
            jumlah_gamis,
            jumlah_mukena,
            tanggalMasuk,
            estimasi
        ],
        (err) => {

            if(err){
                console.log(err);
                return res.send(err);
            }

            res.redirect('/transaksi');

        }
    );

};

exports.hapusTransaksi = (req, res) => {

    if(!req.session.user){
        return res.redirect('/login');
    }

    const id = req.params.id;

    db.query(
        'DELETE FROM transaksi WHERE id = ?',
        [id],
        (err) => {

            if(err){
                console.log(err);
            }

            res.send(`
            <script>
                alert('Data transaksi berhasil dihapus!');
                window.location.href='/transaksi';
            </script>
            `);
        }
    );

};

exports.pelanggan = (req, res) => {

    if(!req.session.user){
        return res.redirect('/login');
    }

    db.query('SELECT * FROM transaksi', (err, transaksi) => {

        if(err){
            console.log(err);
        }

        res.render('pelanggan', {
            pelanggan: transaksi
        });

    });

};

exports.laporan = (req, res) => {

    if(!req.session.user){
        return res.redirect('/login');
    }

    const filter = req.query.filter;

    let sql = 'SELECT * FROM transaksi';

    // laporan hari ini
    if(filter === 'hari'){

        sql = `
            SELECT * FROM transaksi
            WHERE DATE(tanggal_masuk) = CURDATE()
        `;

    }

    // laporan minggu ini
    else if(filter === 'minggu'){

        sql = `
            SELECT * FROM transaksi
            WHERE YEARWEEK(tanggal_masuk, 1)
            = YEARWEEK(CURDATE(), 1)
        `;

    }

    // laporan bulan ini
    else if(filter === 'bulan'){

        sql = `
            SELECT * FROM transaksi
            WHERE MONTH(tanggal_masuk) = MONTH(CURDATE())
            AND YEAR(tanggal_masuk) = YEAR(CURDATE())
        `;

    }

    db.query(sql, (err, transaksi) => {

        if(err){
            console.log(err);
            return res.send(err);
        }

        const pemasukan = transaksi.reduce((total, item) => {

            return total + item.harga;

        }, 0);

        res.render('laporan', {
            transaksi,
            pemasukan
        });

    });

};

exports.editPage = (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM transaksi WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            return res.send(err);
        }

        if(result.length === 0){
            return res.send('Data tidak ditemukan');
        }

        res.render('edit', {
            data: result[0]
        });

    });

};

exports.updateTransaksi = async (req, res) => {

    const axios = require('axios');

    const id = req.params.id;

    const { nama, layanan, berat, status, nohp, jumlah_baju, jumlah_celana, jumlah_gamis, jumlah_handuk, jumlah_jaket, jumlah_kemeja, jumlah_kerudung, jumlah_koko, jumlah_mukena, jumlah_sarung } = req.body;

    let hargaPerKg = 7000;

    if(layanan === 'Express'){
        hargaPerKg = 15000;
    }

    const harga = berat * hargaPerKg;

    const sql = `
        UPDATE transaksi
        SET
            nama = ?,
            layanan = ?,
            berat = ?,
            status = ?,
            harga = ?,
            nohp = ?,

            jumlah_baju = ?,
            jumlah_celana = ?,
            jumlah_jaket = ?,
            jumlah_kerudung = ?,
            jumlah_koko = ?,
            jumlah_handuk = ?,
            jumlah_kemeja = ?,
            jumlah_sarung = ?,
            jumlah_gamis = ?,
            jumlah_mukena = ?

        WHERE id = ?
    `;

    db.query(
        sql,
        [

            nama,
            layanan,
            berat,
            status,
            harga,
            nohp,

            jumlah_baju,
            jumlah_celana,
            jumlah_jaket,
            jumlah_kerudung,
            jumlah_koko,
            jumlah_handuk,
            jumlah_kemeja,
            jumlah_sarung,
            jumlah_gamis,
            jumlah_mukena,

            id

        ],
        async (err) => {

            if(err){
                console.log(err);
                return res.send(err);
            }

            // ubah nomor 08 menjadi 628
            let nomorWA = nohp;

            if(nohp.startsWith('0')){
                nomorWA = '62' + nohp.slice(1);
            }

            // kirim WA jika status selesai
            if(status === 'Selesai'){

                try{

                    await axios.post(
                        'https://api.fonnte.com/send',
                        {
                            target: nomorWA,

                            message:
`Halo ${nama} 👋

Laundry Anda sudah selesai dan siap diambil 🙏

Layanan: ${layanan}
Berat: ${berat} Kg
Total: Rp ${harga.toLocaleString('id-ID')}

Terima kasih telah menggunakan jasa kami.`
                        },
                        {
                            headers: {
                                Authorization: 'KURYCbRMZqZ7tevKqJRr'
                            }
                        }
                    );

                    console.log('WhatsApp berhasil dikirim');

                }catch(error){

                    console.log('Gagal kirim WhatsApp');
                    console.log(error.response?.data || error.message);

                }

            }

            res.send(`
            <script>
                alert('Data transaksi berhasil di edit!');
                window.location.href='/transaksi';
            </script>
            `);
        }
    );

};

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.loginProcess = (req, res) => {

    const { username, password } = req.body;

    if(username === 'admin' && password === '123'){

        req.session.user = username;

        res.redirect('/');

    }else{

        res.send('Username atau password salah');

    }

};

exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect('/login');

    });

};

exports.notaPage = (req, res) => {

    const id = req.params.id;

    const sql = 'SELECT * FROM transaksi WHERE id = ?';

    db.query(sql, [id], async (err, result) => {

        if(err){
            console.log(err);
            return res.send(err);
        }

        const data = result[0];

        // link tracking
        const trackingUrl =
            `http://localhost:3000/tracking/${data.id}`;

        // generate QR
        const qrCode = await QRCode.toDataURL(trackingUrl);

        res.render('nota', {
            data,
            qrCode
        });

    });

};

exports.cekLaundryPage = (req, res) => {

    res.render('cek-laundry', {
        data: null
    });

};

exports.cekLaundry = (req, res) => {

    const { nohp } = req.body;

    const sql = `
        SELECT * FROM transaksi
        WHERE nohp = ?
        ORDER BY id DESC
    `;

    db.query(sql, [nohp], (err, result) => {

        if(err){
            console.log(err);
            return res.send(err);
        }

        res.render('cek-laundry', {
            data: result
        });

    });

};  

exports.trackingPage = (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT * FROM transaksi
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            return res.send(err);
        }

        res.render('tracking', {
            data: result[0]
        });

    });

};