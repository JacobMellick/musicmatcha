type ChartProps =  {stats: Record<number, number>};

const Chart = (stats: ChartProps) => {
  const max = Math.max(...Object.values(stats.stats).map(Number)) === 0 ? 1 : Math.max(...Object.values(stats.stats).map(Number))

    return <div className="px-12 pt-4 text-xs text-right">
        {Object.keys(stats.stats).map(key => {

          const numKey = parseInt(key)

          const val = stats.stats[numKey]

          const width = val !== 0 ? Math.round(val / max * 100): 2

          const title = val.toString()



  return (
    <div
      key={key}
      className={`flex py-1 justify-content items-center`}
    >
      <span className="pr-4 w-6">{key}</span>
      <div style={{ width: `${width}%` }} className={`bg-gray-300 rounded-r-lg h-2`} title={title}></div>
    </div>
  );
})}
    </div>
}

export default Chart;