jest.mock('glob', () => ({
    sync: jest.fn(),
}))
