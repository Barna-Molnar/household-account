import useCounter from "./useCounter";

const Counter = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default Counter;
