function png(file) {
    return require(`../assets/images/${file}.png`);
}

const images = {
    up: png('up'),
    down: png('down'),
    left: png('left'),
    right: png('right'),
};

function Arrow({ value, ai, choose, allowed, onChoose }) {
    if (choose) {
        if (!allowed) allowed = Arrow.directions;

        return (
            <div className="arrow-choose">
                {Object.entries(images).map((option, key) => (
                    <button
                        key={key}
                        disabled={!allowed.includes(option[0]) || ai}
                        onClick={() => {
                            onChoose &&
                                allowed.includes(option[0]) &&
                                onChoose(option[0]);
                        }}
                    >
                        <img src={option[1]} alt={option[0]} />
                    </button>
                ))}
                {ai && (
                    <img className="ai-indicator" src={png('ai')} alt="AI" />
                )}
            </div>
        );
    }

    return (
        <div className="arrow">
            <img className="arrow-image" src={images[value]} alt={value} />
            {ai && <img className="ai-indicator" src={png('ai')} alt="AI" />}
        </div>
    );
}

Arrow.directions = Object.keys(images);

export default Arrow;
