export const transformDate = ({ year, month, day }: {
    year: number;
    month: number;
    day: number;
}) => `${year}-${month < 10 ? 0 : ''}${month}-${day < 10 ? 0 : ''}${day}`;

export const addTime = (date: string, milliseconds: number) => 
    new Date(new Date(date).getTime() + milliseconds).toISOString().split('T')[0];

export const parseResult = async (res: Response) => res.text()
    .then(text => JSON.parse(text.replace(")]}'\n\n", '')));