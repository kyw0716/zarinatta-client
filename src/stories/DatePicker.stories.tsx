import type { Meta } from '@storybook/react';

import DatePicker from '@/components/date-picker/DatePicker';
import { useState } from 'react';

const meta = {
  title: 'Example/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

export const singleDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<number>(0);

  return (
    <DatePicker
      year={2024}
      startMonth={2}
      setSelectedDate={setSelectedDate}
      selectedDate={selectedDate}
    />
  );
};

// maxCount 값 컨트롤 패널에서 입력할 수 있도록 수정하기
export const multipleDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<number[]>([]);

  return (
    <DatePicker
      year={2024}
      startMonth={2}
      setSelectedDate={setSelectedDate}
      selectedDate={selectedDate}
      maxCount={3}
      multiple
    />
  );
};
