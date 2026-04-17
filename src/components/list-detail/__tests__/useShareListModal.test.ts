import { renderHook, act } from "@testing-library/react";
import useShareListModal from "../useShareListModal";
import { List } from "../../../types/list";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockAddUser = jest.fn();
const mockUpdateUserField = jest.fn();
const mockDeleteUser = jest.fn();
const mockDispatch = jest.fn();

jest.mock("../../../hooks/api/list-users", () => ({
  useAddListUser: () => ({
    mutate: mockAddUser,
    isPending: false,
  }),
  useUpdateListUser: () => ({
    mutate: mockUpdateUserField,
  }),
  useDeleteListUser: () => ({
    mutate: mockDeleteUser,
  }),
}));

jest.mock("../../../context/list-store", () => ({
  useListDispatch: () => mockDispatch,
}));

// ── Helpers ──────────────────────────────────────────────────────────────────

const makeList = (overrides: Partial<List> = {}): List => ({
  _id: "list-1",
  name: "Test List",
  owner: "owner@test.com",
  fields: [],
  items: [],
  ...overrides,
});

// ── Tests ────────────────────────────────────────────────────────────────────

describe("useShareListModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("retorna tableItems vacío cuando la lista no tiene users", () => {
    const { result } = renderHook(() =>
      useShareListModal(makeList({ users: undefined }))
    );

    expect(result.current.tableItems).toEqual([]);
  });

  it("convierte list.users a tableItems correctamente", () => {
    const users = [
      { _id: 1, email: "a@test.com", role: "editor" },
      { _id: 2, email: "b@test.com", role: "viewer" },
    ];

    const { result } = renderHook(() =>
      useShareListModal(makeList({ users }))
    );

    expect(result.current.tableItems).toHaveLength(2);
    expect(result.current.tableItems[0]).toMatchObject({
      _id: 1,
      email: "a@test.com",
    });
  });

  it("retorna los fields de la tabla de usuarios built-in", () => {
    const { result } = renderHook(() => useShareListModal(makeList()));

    expect(result.current.tableFields).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: "email" }),
        expect.objectContaining({ _id: "role" }),
      ])
    );
  });

  it("handleAddUser llama a la mutation addUser", () => {
    const { result } = renderHook(() => useShareListModal(makeList()));

    act(() => {
      result.current.handleAddUser();
    });

    expect(mockAddUser).toHaveBeenCalledWith({});
  });

  it("handleRemoveUser hace dispatch de RemoveUser y llama a deleteUser", () => {
    const users = [{ _id: 1, email: "a@test.com", role: "editor" }];

    const { result } = renderHook(() =>
      useShareListModal(makeList({ users }))
    );

    act(() => {
      result.current.handleRemoveUser("1");
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: "1",
      })
    );
    expect(mockDeleteUser).toHaveBeenCalledWith("1");
  });

  it("handleUpdateUserField hace dispatch de UpdateUser con el valor actualizado", () => {
    const users = [{ _id: 1, email: "a@test.com", role: "viewer" }];

    const { result } = renderHook(() =>
      useShareListModal(makeList({ users }))
    );

    act(() => {
      result.current.handleUpdateUserField("1", "role", "editor");
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          _id: 1,
          role: "editor",
        }),
      })
    );
  });
});
