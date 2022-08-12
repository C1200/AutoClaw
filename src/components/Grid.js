function Grid({ children, rows, cols, style, unit, className }) {
    const elemStyle = {
        display: 'grid',
        gridTemplateRows: ((unit || '1fr') + ' ').repeat(rows),
        gridTemplateColumns: ((unit || '1fr') + ' ').repeat(cols),
        ...style,
    };

    return (
        <div className={className} style={elemStyle}>
            {children}
        </div>
    );
}

export default Grid;
