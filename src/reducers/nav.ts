import { AppNavigator } from '../router';
import { NavigationState, NavigationAction } from 'react-navigation';

export default function navReducer(state: NavigationState, action: NavigationAction) {
    const newState = AppNavigator.router.getStateForAction(action, state)
    return newState
}
