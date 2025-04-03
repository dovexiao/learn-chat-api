export const USER_PERMISSIONS: { [key: number]: string } = {
    0: 'BASIC'
}

// 更新事件类型映射
export const UPDATE_TYPE_MAP: { [key: number]: string } = {
    0: '初始',
    1: '保存',
};

// 操作类型映射
export const OPERATION_TYPE: { [key: number]: string} = {
    0: '创建',
    1: '保存',
    2: '切换',
    3: '存草稿'
};

// 内容来源类型
export const CONTENT_SOURCE = {
    DRAFT: 'draft',
    UPDATE_EVENT: 'update_event'
} as const;

// 权限类型映射
export const PERMISSION_MAP: { [key: number]: string } = {
    0: '管理',
    1: '只读',
    2: '共建',
};

