import {appReducer, InitialStateType, setErrorAC, setStatusAC} from './app-reducer'



let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error message should be set', () => {

    const endState = appReducer(startState, setErrorAC({error: 'some error'}))

    expect(endState.error).toBe('some error');
})

test('correct status should be set', () => {

    const endState = appReducer(startState, setStatusAC({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

