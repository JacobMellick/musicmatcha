type ChartProps =  {stats: Record<number, number>};

const Chart = (stats: ChartProps) => {
  const max = Math.max(...Object.values(stats.stats).map(Number))

    return <div>
        {Object.keys(stats.stats).map(key => {

  return (
    <div
      key={key}
      className={`w-${key}`}
    >
      {key}
      {max}
    </div>
  );
})}
    </div>
}

export default Chart;