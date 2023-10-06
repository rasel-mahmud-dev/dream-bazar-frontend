import {  useDispatch } from 'react-redux'
import type {  AppDispatch } from 'src/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch;
