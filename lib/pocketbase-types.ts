/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export const Collections = {
	Authorigins: "_authOrigins",
	Externalauths: "_externalAuths",
	Mfas: "_mfas",
	Otps: "_otps",
	Superusers: "_superusers",
	Comments: "comments",
	Events: "events",
	Files: "files",
	Folders: "folders",
	Gallery: "gallery",
	Keunggulan: "keunggulan",
	Menus: "menus",
	Pages: "pages",
	Posts: "posts",
	QuickPopularLinks: "quick_popular_links",
	SchoolSettings: "school_settings",
	SliderItems: "slider_items",
	Teachers: "teachers",
	Users: "users",
	VisiMisi: "visi_misi",
} as const
export type Collections = typeof Collections[keyof typeof Collections]

// Alias types for improved usability
export type IsoDateString = string
export type IsoAutoDateString = string & { readonly autodate: unique symbol }
export type RecordIdString = string
export type FileNameString = string & { readonly filename: unique symbol }
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated: IsoAutoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated: IsoAutoDateString
}

export type MfasRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	method: string
	recordRef: string
	updated: IsoAutoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created: IsoAutoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated: IsoAutoDateString
}

export type SuperusersRecord = {
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export const CommentsEntityTypeOptions = {
	"posts": "posts",
	"pages": "pages",
} as const
export type CommentsEntityTypeOptions = typeof CommentsEntityTypeOptions[keyof typeof CommentsEntityTypeOptions]
export type CommentsRecord = {
	author_email?: string
	author_name?: string
	author_website?: string
	content?: HTMLString
	created: IsoAutoDateString
	entity_id?: string
	entity_type?: CommentsEntityTypeOptions
	flags_count?: number
	id: string
	is_approved?: boolean
	is_flagged?: boolean
	parent_id?: RecordIdString
	tenant?: RecordIdString
	updated: IsoAutoDateString
}

export type EventsRecord = {
	content?: string
	created: IsoAutoDateString
	id: string
	image?: string
	tenant?: RecordIdString
	text?: string
	title?: string
	updated: IsoAutoDateString
}

export type FilesRecord = {
	created: IsoAutoDateString
	folder?: RecordIdString
	id: string
	judul?: string
	link?: string
	size?: number
	tenant?: RecordIdString
	updated: IsoAutoDateString
}

export type FoldersRecord = {
	created: IsoAutoDateString
	id: string
	name?: string
	parent?: RecordIdString
	tenant?: RecordIdString
	updated: IsoAutoDateString
}

export type GalleryRecord = {
	created: IsoAutoDateString
	description?: string
	id: string
	image?: string
	tenant?: RecordIdString
	title?: string
	updated: IsoAutoDateString
}

export type KeunggulanRecord = {
	created: IsoAutoDateString
	deskripsi?: string
	icon?: string
	id: string
	judul?: string
	tenant?: RecordIdString
	updated: IsoAutoDateString
}

export type MenusRecord = {
	created: IsoAutoDateString
	id: string
	name?: string
	order?: number
	parent?: RecordIdString
	tenant?: RecordIdString
	updated: IsoAutoDateString
	url?: string
}

export type PagesRecord = {
	content?: string
	created: IsoAutoDateString
	id: string
	slug?: string
	tenant?: RecordIdString
	title?: string
	updated: IsoAutoDateString
}

export type PostsRecord = {
	author_name?: string
	author_picture?: string
	content?: HTMLString
	cover_image?: string
	created: IsoAutoDateString
	date?: string
	excerpt?: string
	id: string
	slug?: string
	tenant?: RecordIdString
	title?: string
	updated: IsoAutoDateString
}

export const QuickPopularLinksTypeOptions = {
	"quick": "quick",
	"popular": "popular",
} as const
export type QuickPopularLinksTypeOptions = typeof QuickPopularLinksTypeOptions[keyof typeof QuickPopularLinksTypeOptions]
export type QuickPopularLinksRecord<Titem = unknown> = {
	created: IsoAutoDateString
	id: string
	item?: null | Titem
	tenant?: RecordIdString
	type?: QuickPopularLinksTypeOptions
	updated: IsoAutoDateString
}

export type SchoolSettingsRecord = {
	about_image?: string
	alamat?: string
	created: IsoAutoDateString
	email?: string
	facebook?: string
	home_background?: string
	id: string
	instagram?: string
	jam_kerja?: string
	logo?: string
	nama_sekolah?: string
	popup?: HTMLString
	sekilas_info?: string
	telepon?: string
	tenant?: RecordIdString
	tentang_kepsek?: string
	title?: string
	twitter?: string
	updated: IsoAutoDateString
	video?: string
	youtube?: string
}

export type SliderItemsRecord<Titems = unknown> = {
	created: IsoAutoDateString
	id: string
	items?: null | Titems
	tenant?: RecordIdString
	updated: IsoAutoDateString
}

export type TeachersRecord = {
	created: IsoAutoDateString
	facebook?: string
	foto?: string
	id: string
	instagram?: string
	mapel?: string
	nama?: string
	tenant?: RecordIdString
	twitter?: string
	updated: IsoAutoDateString
}

export type UsersRecord = {
	avatar?: FileNameString
	created: IsoAutoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated: IsoAutoDateString
	verified?: boolean
}

export const VisiMisiTypeOptions = {
	"visi": "visi",
	"misi": "misi",
} as const
export type VisiMisiTypeOptions = typeof VisiMisiTypeOptions[keyof typeof VisiMisiTypeOptions]
export type VisiMisiRecord<Titem = unknown> = {
	created: IsoAutoDateString
	id: string
	item?: null | Titem
	tenant?: RecordIdString
	type?: VisiMisiTypeOptions
	updated: IsoAutoDateString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type CommentsResponse<Texpand = unknown> = Required<CommentsRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type FoldersResponse<Texpand = unknown> = Required<FoldersRecord> & BaseSystemFields<Texpand>
export type GalleryResponse<Texpand = unknown> = Required<GalleryRecord> & BaseSystemFields<Texpand>
export type KeunggulanResponse<Texpand = unknown> = Required<KeunggulanRecord> & BaseSystemFields<Texpand>
export type MenusResponse<Texpand = unknown> = Required<MenusRecord> & BaseSystemFields<Texpand>
export type PagesResponse<Texpand = unknown> = Required<PagesRecord> & BaseSystemFields<Texpand>
export type PostsResponse<Texpand = unknown> = Required<PostsRecord> & BaseSystemFields<Texpand>
export type QuickPopularLinksResponse<Titem = unknown, Texpand = unknown> = Required<QuickPopularLinksRecord<Titem>> & BaseSystemFields<Texpand>
export type SchoolSettingsResponse<Texpand = unknown> = Required<SchoolSettingsRecord> & BaseSystemFields<Texpand>
export type SliderItemsResponse<Titems = unknown, Texpand = unknown> = Required<SliderItemsRecord<Titems>> & BaseSystemFields<Texpand>
export type TeachersResponse<Texpand = unknown> = Required<TeachersRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type VisiMisiResponse<Titem = unknown, Texpand = unknown> = Required<VisiMisiRecord<Titem>> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	comments: CommentsRecord
	events: EventsRecord
	files: FilesRecord
	folders: FoldersRecord
	gallery: GalleryRecord
	keunggulan: KeunggulanRecord
	menus: MenusRecord
	pages: PagesRecord
	posts: PostsRecord
	quick_popular_links: QuickPopularLinksRecord
	school_settings: SchoolSettingsRecord
	slider_items: SliderItemsRecord
	teachers: TeachersRecord
	users: UsersRecord
	visi_misi: VisiMisiRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	comments: CommentsResponse
	events: EventsResponse
	files: FilesResponse
	folders: FoldersResponse
	gallery: GalleryResponse
	keunggulan: KeunggulanResponse
	menus: MenusResponse
	pages: PagesResponse
	posts: PostsResponse
	quick_popular_links: QuickPopularLinksResponse
	school_settings: SchoolSettingsResponse
	slider_items: SliderItemsResponse
	teachers: TeachersResponse
	users: UsersResponse
	visi_misi: VisiMisiResponse
}

// Utility types for create/update operations

type ProcessCreateAndUpdateFields<T> = Omit<{
	// Omit AutoDate fields
	[K in keyof T as Extract<T[K], IsoAutoDateString> extends never ? K : never]: 
		// Convert FileNameString to File
		T[K] extends infer U ? 
			U extends (FileNameString | FileNameString[]) ? 
				U extends any[] ? File[] : File 
			: U
		: never
}, 'id'>

// Create type for Auth collections
export type CreateAuth<T> = {
	id?: RecordIdString
	email: string
	emailVisibility?: boolean
	password: string
	passwordConfirm: string
	verified?: boolean
} & ProcessCreateAndUpdateFields<T>

// Create type for Base collections
export type CreateBase<T> = {
	id?: RecordIdString
} & ProcessCreateAndUpdateFields<T>

// Update type for Auth collections
export type UpdateAuth<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof AuthSystemFields>
> & {
	email?: string
	emailVisibility?: boolean
	oldPassword?: string
	password?: string
	passwordConfirm?: string
	verified?: boolean
}

// Update type for Base collections
export type UpdateBase<T> = Partial<
	Omit<ProcessCreateAndUpdateFields<T>, keyof BaseSystemFields>
>

// Get the correct create type for any collection
export type Create<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? CreateAuth<CollectionRecords[T]>
		: CreateBase<CollectionRecords[T]>

// Get the correct update type for any collection
export type Update<T extends keyof CollectionResponses> =
	CollectionResponses[T] extends AuthSystemFields
		? UpdateAuth<CollectionRecords[T]>
		: UpdateBase<CollectionRecords[T]>

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = {
	collection<T extends keyof CollectionResponses>(
		idOrName: T
	): RecordService<CollectionResponses[T]>
} & PocketBase
