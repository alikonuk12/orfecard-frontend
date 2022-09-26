import React from 'react';
import { PDFViewer } from '../../components';
import pdf from '../../common/mesafeli_satis_sozlesmesi.pdf';

const MesafeliSatisSozlesmesi = () => {
    return <PDFViewer pdf={pdf} />;
}

export default MesafeliSatisSozlesmesi;