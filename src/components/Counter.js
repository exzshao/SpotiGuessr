function Counter(props){
    const c = useRef(0);
    return(
        <div>
            <h3>{props.i}</h3>
            <h3>{props.len}</h3>
        </div>

    );
}