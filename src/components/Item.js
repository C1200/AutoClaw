import Border from './Border';

function png(file) {
    return require(`../assets/images/${file}.png`);
}

const images = {
    'a hat': png('top-hat'),
    'a book': png('book'),
    'a shoe': png('running-shoe'),
    'a remote control': png('remote-control'),
    'a clock': png('clock'),
    'a teddy bear': png('teddy-bear'),
    'a box': png('box'),
    'some headphones': png('headphones'),
    'a tie': png('tie'),
    'some bread': png('bread'),
    'a pair of glasses': png('glasses'),
    'a TV': png('tv'),
    'a couch': png('couch'),
};

function Item({ value, children }) {
    if (!value) {
        return <Border className="item">{children}</Border>;
    }

    if (value === 'chute') {
        return <Border className="chute">{children}</Border>;
    }

    return (
        <Border className="item">
            <img src={images[value]} alt={value} />
            {children}
        </Border>
    );
}

Item.items = Object.keys(images);

export default Item;
