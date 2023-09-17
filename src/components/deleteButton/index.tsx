import LongPressButton from "../longPressButton";

interface TProps {
    loading: boolean;
    onEnd: () => void;
}
export default function DeleteButton({onEnd, loading}: TProps) {
    return (
        <LongPressButton
            loading={loading}
            seconds={1}
            color={'red'}
            fullWidth
            variant={'outline'}
            label={'Да'}
            onPressed={onEnd}/>
    )
}
