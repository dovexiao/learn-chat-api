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

export const GROUP_ROLE: {[key: number]: string} =  {
    0: '管理员',
    1: '副管理员',
    2: '普通成员',
}

// 消息内容类型
export const MESSAGE_CONTENT_TYPE = {
    TEXT: 0,
    NOTE_SHARE: 1,
    GROUP_CARD_SHARE: 2,
} as const;

// 消息状态
export const MESSAGE_STATUS = {
    SENT: 0,
    NOT_SENT: 1,
    UNREAD: 2,
    READ: 3,
} as const;

// 群成员角色
export const GROUP_MEMBER_ROLE = {
    ADMIN: 0,
    DEPUTY_ADMIN: 1,
    ORDINARY_MEMBER: 2,
} as const;

