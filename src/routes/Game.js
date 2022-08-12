import { useState, useEffect, useCallback } from 'react';
import { randomInt } from '../utils/random';
import Border from '../components/Border';
import Claw from '../components/Claw';
import Grid from '../components/Grid';
import Item from '../components/Item';
import Arrow from '../components/Arrow';

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

function allowedMoves(clawPos) {
    let moves = new Set(Arrow.directions);

    if (clawPos[0] === 0) moves.delete('left');
    if (clawPos[1] === 0) moves.delete('up');
    if (clawPos[0] === 9) moves.delete('right');
    if (clawPos[1] === 9) moves.delete('down');

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
            default:
                break;
        }
    });

    return newClawPos;
}

function aiMove(clawPos) {
    const moves = allowedMoves(clawPos);
    return moves[randomInt(0, moves.length - 1)];
}

function Game() {
    const [items, setItems] = useState(null);
    const [clawOpen, setClawOpen] = useState(true);
    const [clawPos, setClawPos] = useState([0, 0]);
    const [fetchingItem, fetchItem] = useState(null);
    const [code, setCode] = useState([{ choose: true }]);

    const remainingItems = Array.isArray(items)
        ? items.flat().filter((item) => item !== null && item !== 'chute')
              .length
        : -1;

    function removeItem([x, y]) {
        setItems((prev) => {
            if (prev === null) return null;
            prev[y][x] = null;
            return prev;
        });
    }

    const go = useCallback(async function () {
        function wait(delay) {
            return new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
        }

        const newClawPos = calculateClawPos(clawPos, code);
        setClawPos(newClawPos);
        setCode([{ choose: true }]);

        if (items[newClawPos[1]][newClawPos[0]] === fetchingItem) {
            setClawOpen(false);
            removeItem(newClawPos);
            await wait(1000);
            setClawPos([0, 0]);
            setClawOpen(true);
        } else {
            setClawPos([0, 0]);
        }
    }, [clawPos, code, fetchingItem, items]);

    useEffect(() => {
        if (!items) {
            let y = [];

            for (let i = 0; i < 10; i++) {
                y.push(generateItems(10, i === 0));
            }

            setItems(y);
        }
    }, [items]);

    useEffect(() => {
        if (!fetchingItem && items) {
            let newItem;
            while (!newItem) {
                let choice = items[randomInt(0, 9)];

                if (Array.isArray(choice)) newItem = choice[randomInt(0, 9)];
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
                setCode((prev) => {
                    let copy = [...prev];
                    copy[copy.length - 1] = {
                        value: aiMove(calculateClawPos(clawPos, prev)),
                        ai: true,
                    };
                    copy.push({ choose: true });
                    return copy;
                });
            }, 2000);
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
                    <Grid cols={10} rows={10} unit="4em">
                        {(items || []).map((row, ypos) =>
                            row.map((item, xpos) => (
                                <Item value={item} key={xpos + ':' + ypos}>
                                    {clawPos[0] === xpos &&
                                        clawPos[1] === ypos && (
                                            <Claw open={clawOpen} />
                                        )}
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
                                        calculateClawPos(clawPos, code)
                                    )}
                                    onChoose={(direction) => {
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
