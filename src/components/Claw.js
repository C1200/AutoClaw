import clawOpen from '../assets/images/claw-open.png';
import clawClosed from '../assets/images/claw-closed.png';

function Claw({ open, ghost }) {
    const image = open ? clawOpen : clawClosed;

    return (
        <div className="claw">
            <img
                style={{ opacity: ghost ? '0.5' : '1' }}
                src={image}
                alt={`claw ${open ? 'open' : 'closed'}`}
            />
        </div>
    );
}

export default Claw;
