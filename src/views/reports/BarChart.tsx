import {
  XAxis,
  Tooltip,
  TooltipProps,
  CartesianGrid,
  YAxis,
  LineChart,
  Line,
} from "recharts";

import { useState } from "react";
import CardWrapper from "@/components/ui/CardWrapper";
import clsx from "clsx";

// import the locale object
import { ro } from "react-day-picker/locale";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronUpDownIcon, PlusIcon } from "@heroicons/react/20/solid";
export function MyDatePicker() {
  const [selected, setSelected] = useState<Date>();

  const defaultClassNames = getDefaultClassNames();
  return (
    <div className=" block">
      <DayPicker
        captionLayout="dropdown"
        // className="text-white/80 "
        classNames={{
          // today: `border-amber-500`, // Add a border to today's date
          // selected: `bg-amber-500 rounded-full border-amber-500 text-white`, // Highlight the selected day
          root: `${defaultClassNames.root} shadow-lg bg-white rounded-lg px-2 pb-2`, // Add a shadow to the root element
          // chevron: `${defaultClassNames.chevron} fill-white/80`, // Change the color of the chevron
        }}
        locale={ro}
        mode="range"
        // selected={selected}
        // onSelect={setSelected}
        footer={
          selected
            ? `Selected: ${selected.toLocaleDateString()}`
            : "Pick a day."
        }
      />
    </div>
  );
}

const chartData = [
  {
    date: "2024-07-15",
    revenue: 1100,
    transportation: 280,
    taxes: 140,
    costs: 480,
    losses: 45,
  },
  {
    date: "2024-07-16",
    revenue: 1350,
    transportation: 330,
    taxes: 165,
    costs: 530,
    losses: 70,
  },
  {
    date: "2024-07-17",
    revenue: 1200,
    transportation: 300,
    taxes: 150,
    costs: 500,
    losses: 55,
  },
  {
    date: "2024-07-18",
    revenue: 1450,
    transportation: 360,
    taxes: 175,
    costs: 550,
    losses: 75,
  },
  {
    date: "2024-07-19",
    revenue: 1300,
    transportation: 320,
    taxes: 160,
    costs: 520,
    losses: 60,
  },
  {
    date: "2024-07-20",
    revenue: 1550,
    transportation: 380,
    taxes: 185,
    costs: 570,
    losses: 85,
  },
];

const chartData2 = [
  {
    date: "2024-07-15",

    transportation: 280,
    taxes: 140,
    costs: 480,
    losses: 45,
  },
  {
    date: "2024-07-16",

    transportation: 330,
    taxes: 165,
    costs: 530,
    losses: 70,
  },
  {
    date: "2024-07-17",

    transportation: 300,
    taxes: 150,
    costs: 500,
    losses: 55,
  },
  {
    date: "2024-07-18",

    transportation: 360,
    taxes: 175,
    costs: 550,
    losses: 75,
  },
  {
    date: "2024-07-19",

    transportation: 320,
    taxes: 160,
    costs: 520,
    losses: 60,
  },
  {
    date: "2024-07-20",

    transportation: 380,
    taxes: 185,
    costs: 570,
    losses: 85,
  },
];

const chartConfig = {
  revenue: {
    label: "Incasari",
    color: "#ef4444", // red-500
    stroke: "#f87171 ", // red-400
  },
  transportation: {
    label: "Transport",
    color: "#eab308", // yellow-500
    stroke: "#facc15", // yellow-400
  },
  taxes: {
    label: "Taxe",
    color: "#3b82f6", // blue-500
    stroke: "#60a5fa", // blue-400
  },
  costs: {
    label: "Costuri",
    color: "#6366f1", // indigo-500
    stroke: "#818cf8", // indigo-500
  },
  losses: {
    label: "Pierderi",
    color: "#22c55e",
    stroke: "#4ade80",
  },
};

const LegendItem: React.FC<{
  value: string;
  label: string;
  borderColor: string;
  setData?: (any) => any;
}> = ({ value, label, borderColor, setData }) => {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => {
        setActive(!active);
        if (setData) {
          setData(active ? chartData : chartData2);
        }
      }}
      className=" group transition"
    >
      <div>
        <div className="flex h-16 flex-1 items-center overflow-hidden border-b border-neutral-700  group-hover:bg-white/5 group-active:bg-white/10">
          <div className="flex w-full flex-col space-y-0.5 px-3 py-2 text-left ">
            <h2 className="text-lg font-semibold leading-5  text-white/80">
              {value}
            </h2>
            <span className="flex items-center text-sm text-white/60">
              {label}
              <ChevronUpDownIcon className="size-4 opacity-0 transition group-hover:opacity-100" />
            </span>
          </div>
          <div
            style={{ backgroundColor: borderColor }}
            // className={clsx(
            //   active ? "translate-x-[10px]" : "translate-x-[5px]",
            //   " w-[10px] h-2  rounded-full transition duration-150"
            // )}
            className={clsx(
              active ? "translate-x-[20px]" : "translate-x-[15px]",
              " h-6 w-[20px]  rounded transition duration-150"
            )}
          />
        </div>
      </div>
    </button>
  );
};

function CustomTooltip({ payload, label, active }: TooltipProps<any, any>) {
  if (active && payload && payload[0]) {
    console.log("tooltipProps", { payload, label, active });
    return (
      <CardWrapper>
        <div className="flex flex-col space-y-2 rounded-md bg-neutral-900/50 p-2 text-white/80 shadow backdrop-blur">
          {payload.map((payloadItem, idx) => {
            const config = chartConfig[payloadItem["dataKey"]!];
            return (
              <div
                key={idx}
                className="flex items-center justify-between space-x-5"
              >
                <div className="flex items-center space-x-2">
                  <div
                    style={{ backgroundColor: config.color }}
                    className="h-3.5 w-1.5 rounded"
                  />
                  <span className="text-sm text-white/80">{config.label}</span>
                </div>
                <span className="text-sm font-semibold text-white/80">
                  {payloadItem.value}
                </span>
              </div>
            );
          })}
          {/* <p className="label">{`${payload[1].value}`}</p> */}
          {/* <p className="intro">{"caca"}</p> */}
          {/* <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      </CardWrapper>
    );
  }

  return null;
}

const BarChartComponent = () => {
  const [data, setData] = useState(chartData);

  return (
    <>
      <div className="flex h-full">
        <div className="flex w-48 flex-col justify-between border-r border-white/15 bg-neutral-800 shadow shadow-black">
          <div className="flex flex-col">
            {/* <div className="flex w-full h-14 border-b border-neutral-700 flex-col">caca</div> */}
            <LegendItem
              value="1432 lei"
              borderColor={chartConfig["revenue"]["color"]}
              label={chartConfig["revenue"]["label"]}
              setData={setData}
            />

            <LegendItem
              value="1432 lei"
              label={chartConfig["transportation"]["label"]}
              borderColor={chartConfig["transportation"]["color"]}
            />
            <LegendItem
              value="1432 lei"
              label={chartConfig["taxes"]["label"]}
              borderColor={chartConfig["taxes"]["color"]}
            />
            <LegendItem
              value="1432 lei"
              label={chartConfig["costs"]["label"]}
              borderColor={chartConfig["costs"]["color"]}
            />
            <LegendItem
              value="1432 lei"
              label={chartConfig["losses"]["label"]}
              borderColor={chartConfig["losses"]["color"]}
            />
            <div className="mt-4 flex w-full items-center justify-center">
              <button className=" p-0.5 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/40">
                <PlusIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div>
            <LineChart
              width={806}
              height={682}
              accessibilityLayer={false}
              margin={{ top: 40, bottom: 40, left: 40, right: 35 }}
              data={data}
            >
              <CartesianGrid
                vertical={true}
                strokeOpacity={0.1}
                stroke="#ffffff"
              />
              <XAxis
                dataKey="date"
                tickLine={true}
                stroke="#ffffff"
                strokeOpacity={0.1}
                tickMargin={10}
                tickSize={20}
                axisLine={false}
                tick={{ fill: "#ffffff", opacity: 0.8 }}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("ro-RO", {
                    weekday: "long",
                  });
                }}
              />

              <YAxis
                stroke="#ffffff"
                strokeOpacity={0.1}
                orientation="right"
                tickLine={true}
                tickMargin={10}
                tickSize={20}
                axisLine={false}
                tickFormatter={(value) => value}
                tick={{ fill: "#ffffff", opacity: 0.8 }}
              />
              <Tooltip
                cursor={{ fillOpacity: "0%" }}
                content={<CustomTooltip />}
              />
              {/* <Legend content={<CustomLegend />} width={966} margin={{bottom: 10, top: 10}} height={20} /> */}
              <Line
                dataKey="revenue"
                // stackId="a"
                fill={chartConfig["revenue"]["color"]}
                stroke={chartConfig["revenue"]["stroke"]}
                type="natural"
                // radius={[0, 0, 0, 0]}
                strokeWidth={1}
                isAnimationActive={false}
              />
              <Line
                dataKey="transportation"
                // stackId="b"
                fill={chartConfig["transportation"]["color"]}
                stroke={chartConfig["transportation"]["stroke"]}
                type="natural"
                isAnimationActive={false}
                // radius={[0, 0, 0, 0]}
              />
              <Line
                dataKey="taxes"
                // stackId="c"
                fill={chartConfig["taxes"]["color"]}
                stroke={chartConfig["taxes"]["stroke"]}
                isAnimationActive={false}
                type="natural"
                // radius={[0, 0, 0, 0]}
              />
              <Line
                dataKey="costs"
                // stackId="d"
                fill={chartConfig["costs"]["color"]}
                stroke={chartConfig["costs"]["stroke"]}
                type="natural"
                isAnimationActive={false}
                // radius={[0, 0, 0, 0]}
              />
              <Line
                dataKey="losses"
                // stackId="e"
                fill={chartConfig["losses"]["color"]}
                stroke={chartConfig["losses"]["stroke"]}
                isAnimationActive={false}
                type="natural"
                // radius={[6, 6, 0, 0]}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChartComponent;
