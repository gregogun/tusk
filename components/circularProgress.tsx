import { svg } from '@/styles/svg';
import { IconProps } from 'types';
import { text } from './text';

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

interface CircleProps {
  percentage?: number;
  colour: string;
}

const Circle = ({ colour, percentage }: CircleProps) => {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ''} // remove colour as 0% sets full circumference
      strokeWidth={'1rem'}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
    />
  );
};

const ProgressText = ({ percentage }) => {
  return (
    <text className={text({ css: { color: '$white' } })} x="50%" y="50%" dominantBaseline="central" textAnchor="middle">
      {percentage.toFixed(0)}%
    </text>
  );
};

interface CircularProgressProps extends IconProps {
  primaryColor: string;
  secondaryColor: string;
  percentage?: number;
}

export const CircularProgress = ({ percentage, primaryColor, secondaryColor, ...props }: CircularProgressProps) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg
      {...props}
      className={svg({ css: props.css })}
      width="100"
      height="100"
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform={`rotate(-90 ${'100 100'})`}>
        <Circle colour={secondaryColor} />
        <Circle colour={primaryColor} percentage={pct} />
      </g>
      <ProgressText percentage={pct} />
    </svg>
  );
};
