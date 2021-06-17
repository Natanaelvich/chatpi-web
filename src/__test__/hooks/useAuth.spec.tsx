/* eslint-disable import/no-extraneous-dependencies */
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import { AuthProvider, useAuth } from '../../hooks/modules/AuthContext';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able signin', async () => {
    const user = {
      id: 'user-123',
      name: 'John doe',
      email: 'johndoe@example.com.br',
    };
    apiMock.onPost('sessions').reply(200, {
      user,
      token: 'token-123',
    });

    const setItemSpy = jest.spyOn(Cookies, 'set');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com.br',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('chatpitoken', 'token-123');
    expect(setItemSpy).toHaveBeenCalledWith('chatpiuser', JSON.stringify(user));
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });

  it('should restore saved data from storage when auth inits', () => {
    const user = {
      id: 'user-123',
      name: 'John doe',
      email: 'johndoe@example.com.br',
    };

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case 'chatpitoken':
          return 'token-123';
        case 'chatpiuser':
          return JSON.stringify(user);
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });
});
