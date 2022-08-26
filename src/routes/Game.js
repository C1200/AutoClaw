import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Howl } from 'howler';
import { randomInt } from '../utils/random';

import Border from '../components/Border';
import Claw from '../components/Claw';
import Grid from '../components/Grid';
import Item from '../components/Item';
import Arrow from '../components/Arrow';

let GRID_SIZE = [0, 0];

function generateItem() {
    const items = Item.items;
    const rand = randomInt(0, items.length - 1);
    return items[rand];
}

function generateItems(amount, claw) {
    let array = [];
    for (let i = 0; i < amount; i++) {
        if (claw && i === 0) array.push('chute');
        else array.push(generateItem());
    }
    return array;
}

function allowedMoves(clawPos, lastMove) {
    let moves = new Set(Arrow.directions);

    if (moves.has(lastMove)) moves.delete(lastMove);

    if (clawPos[0] === 0) moves.delete('left');
    if (clawPos[1] === 0) moves.delete('up');
    if (clawPos[0] === GRID_SIZE[0] - 1) moves.delete('right');
    if (clawPos[1] === GRID_SIZE[1] - 1) moves.delete('down');

    return [...moves.values()];
}

function calculateClawPos(clawPos, code) {
    let newClawPos = [...clawPos];

    code.forEach((line) => {
        switch (line.value) {
            case 'up':
                newClawPos[1] -= 1;
                break;
            case 'down':
                newClawPos[1] += 1;
                break;
            case 'left':
                newClawPos[0] -= 1;
                break;
            case 'right':
                newClawPos[0] += 1;
                break;
            case 'pause':
                break;
            default:
                break;
        }
    });

    return newClawPos;
}

function aiMove(clawPos) {
    const moves = [...allowedMoves(clawPos), 'pause'];
    return moves[randomInt(0, moves.length - 1)];
}

const clawAudio = new Howl({
    src: [require('../assets/audio/claw.mp3')],
});

const goAudio = new Howl({
    src: [require('../assets/audio/toggle_001.mp3')],
});

const moveSfx = [
    require('../assets/audio/confirmation_001.mp3'),
    require('../assets/audio/confirmation_002.mp3'),
    require('../assets/audio/confirmation_003.mp3'),
    require('../assets/audio/confirmation_004.mp3'),
];
function playMoveAudio() {
    const howl = new Howl({
        src: [moveSfx[randomInt(0, moveSfx.length - 1)]],
    });
    howl.play();
}

function Game() {
    const navigate = useNavigate();
    const params = useParams();
    const [items, setItems] = useState(null);
    const [clawOpen, setClawOpen] = useState(true);
    const [clawPos, setClawPos] = useState([0, 0]);
    const [fetchingItem, fetchItem] = useState(null);
    const [code, setCode] = useState([{ choose: true }]);
    const [totalLines, setTotalLines] = useState(0);
    const [hideGhost, setHideGhost] = useState(false);
    const [lastMove, setLastMove] = useState(null);

    GRID_SIZE = [parseInt(params.x), parseInt(params.y)];

    const remainingItems = Array.isArray(items)
        ? items.flat().filter((item) => item !== null && item !== 'chute')
              .length
        : -1;

    if (remainingItems === 0) {
        setTimeout(() => {
            navigate(`/win/${totalLines}`);
        }, 2000);
    }

    function removeItem([x, y]) {
        setItems((prev) => {
            if (prev === null) return null;
            prev[y][x] = null;
            return prev;
        });
    }

    const go = async function () {
        function wait(delay) {
            return new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
        }

        goAudio.play();
        setLastMove(null);
        setCode((prev) => {
            const copy = [...prev];
            return copy.filter((line) => !!line.value);
        });

        setHideGhost(true);
        setTotalLines((prev) => {
            return prev + code.filter((line) => !!line.value).length;
        });

        const newClawPos = calculateClawPos(clawPos, code);
        setClawPos(newClawPos);
        await wait(2000);

        if (items[newClawPos[1]][newClawPos[0]] === fetchingItem) {
            clawAudio.play();
            removeItem(newClawPos);
            setClawOpen(false);
            await wait(2000);
            clawAudio.play();
            setClawPos([0, 0]);
            setClawOpen(true);
            fetchItem(null);
        } else {
            setClawPos([0, 0]);
        }

        setHideGhost(false);
        setCode([{ choose: true }]);
    };

    useEffect(() => {
        if (!items) {
            let y = [];

            for (let i = 0; i < GRID_SIZE[1]; i++) {
                y.push(generateItems(GRID_SIZE[0], i === 0));
            }

            setItems(y);
        }
    }, [items]);

    useEffect(() => {
        if (!fetchingItem && items) {
            let newItem;
            while (!newItem) {
                let choice = items[randomInt(0, GRID_SIZE[1] - 1)];

                if (Array.isArray(choice))
                    newItem = choice[randomInt(0, GRID_SIZE[0])];
                else newItem = null;

                if (newItem === 'chute') newItem = null;
            }
            fetchItem(newItem);
        }
    }, [fetchingItem, items]);

    useEffect(() => {
        let choosingTimeout;

        if (code[code.length - 1].aiChoose) {
            choosingTimeout = setTimeout(() => {
                playMoveAudio();
                setCode((prev) => {
                    let copy = [...prev];
                    copy[copy.length - 1] = {
                        value: aiMove(calculateClawPos(clawPos, prev)),
                        ai: true,
                    };
                    copy.push({ choose: true });
                    return copy;
                });
            }, 1500);
        }

        return () => {
            clearTimeout(choosingTimeout);
        };
    }, [code, clawPos]);

    return (
        <Grid
            cols={2}
            rows={1}
            unit="auto"
            style={{ width: '100%', height: '100%' }}
        >
            <div className="item-grid-container">
                <Border>
                    <Grid cols={GRID_SIZE[0]} rows={GRID_SIZE[1]} unit="4em">
                        {(items || []).map((row, ypos) =>
                            row.map((item, xpos) => (
                                <Item value={item} key={xpos + ':' + ypos}>
                                    {clawPos[0] === xpos &&
                                        clawPos[1] === ypos && (
                                            <Claw open={clawOpen} />
                                        )}
                                    {calculateClawPos(clawPos, code).every(
                                        (val, idx) => val === [xpos, ypos][idx]
                                    ) &&
                                        !hideGhost && <Claw open ghost />}
                                </Item>
                            ))
                        )}
                    </Grid>
                </Border>
            </div>
            <div className="control-section">
                <h4 className="fetching">Fetch {fetchingItem}</h4>
                <button
                    className="go-button"
                    disabled={
                        code[code.length - 1].aiChoose ||
                        code[code.length - 1].go
                    }
                    onClick={go}
                >
                    Go
                </button>
                <Grid className="arrows" rows={10} cols={2} unit="auto">
                    {code.map((line, key) => {
                        if (line.choose) {
                            return (
                                <Arrow
                                    key={key}
                                    choose
                                    allowed={allowedMoves(
                                        calculateClawPos(clawPos, code),
                                        lastMove
                                    )}
                                    onChoose={(direction) => {
                                        playMoveAudio();
                                        setLastMove(direction);
                                        setCode((prev) => {
                                            let copy = [...prev];
                                            copy[copy.length - 1] = {
                                                value: direction,
                                                ai: false,
                                            };
                                            copy.push({ aiChoose: true });
                                            return copy;
                                        });
                                    }}
                                />
                            );
                        }

                        if (line.aiChoose) {
                            return <Arrow key={key} choose ai />;
                        }

                        return (
                            <Arrow key={key} value={line.value} ai={line.ai} />
                        );
                    })}
                </Grid>
            </div>
        </Grid>
    );
}

export default Game;
