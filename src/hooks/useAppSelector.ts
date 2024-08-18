import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;
