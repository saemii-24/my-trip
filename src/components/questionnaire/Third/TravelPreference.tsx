import { useForm, Controller } from 'react-hook-form';
import { cn } from '@utils/cn';
import travelPreference from '@constant/travelPreference';
import Image from 'next/image';
import Button from '@components/Button';

type FormValues = {
  travelPreference: number[];
};

export default function TravelPreferenceForm() {
  const { handleSubmit, control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      travelPreference: [],
    },
  });

  const selected = watch('travelPreference') ?? [];

  const toggleSelect = (current: number) => {
    const isSelected = selected.includes(current);
    if (isSelected) {
      setValue(
        'travelPreference',
        selected.filter((item) => item !== current),
      );
    } else if (selected.length < 2) {
      setValue('travelPreference', [...selected, current]);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log('🧳 선택된 여행 취향:', data.travelPreference);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <Controller
        name='travelPreference'
        control={control}
        render={() => (
          <div className='grid grid-cols-3 gap-4'>
            {travelPreference.map((item) => {
              const isSelected = selected.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  className={cn(
                    'cursor-pointer group rounded-xl p-4 flex flex-col transition-all duration-200 border',
                    isSelected
                      ? 'border-lime-500 bg-lime-50 '
                      : 'border-gray-200 hover:bg-lime-50',
                  )}
                >
                  <div
                    className={cn(
                      'rounded-full group-hover:bg-lime-100 bg-lime-50 size-14 flex-center',
                      { 'bg-lime-100': isSelected },
                    )}
                  >
                    <Image
                      src={`/icons/${item.icon}`}
                      alt={item.title}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className='text-lg font-semibold'>{item.title}</div>
                  <div className='text-sm text-gray-500 break-keep mt-1'>
                    {item.description}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />

      <Button type='submit' />
    </form>
  );
}
