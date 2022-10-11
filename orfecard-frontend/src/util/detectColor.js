const detectColor = (color) => {
    switch (color) {
        case '#000000':
            return 'Siyah';

        case '#FFFFFF':
            return 'Beyaz';

        case '#FF00FF':
            return 'Magenta';

        case '#00FF00':
            return 'Yeşil';

        case '#0000FF':
            return 'Mavi';

        case '#FF0000':
            return 'Kırmızı';

        default:
            break;
    }
};

export default detectColor;