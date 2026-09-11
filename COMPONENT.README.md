# Custom Web Components

## Usage

```html
<script
  type="module"
  src="https://pages-github.b-cdn.net/webcomponents/modules/cs-input.js"
></script>
```

## Type Definitions (npm)

Install the type package to get autocomplete and type checking for the custom elements:

```bash
npm install -D @yokowasis/types-webcomponents
```

or

```bash
pnpm add -D @yokowasis/types-webcomponents
```

## Use d.ts In IDE (VS Code)

1. Install the package:

```bash
npm install -D @yokowasis/types-webcomponents
```

2. Ensure TypeScript loads it.

Usually it works automatically. If not, add this in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@yokowasis/types-webcomponents"]
  }
}
```

3. Restart TypeScript Server in VS Code:

- Open Command Palette
- Run `TypeScript: Restart TS Server`

4. If autocomplete is still missing, add a local declaration bridge (for example `src/app.d.ts`):

```ts
/// <reference types="@yokowasis/types-webcomponents" />
```

Then reload the VS Code window.

### Example with TypeScript support:

#### Dashboard

```typescript
const dashboard = document.getElementById(
  "dashboard",
) as CSElement["cs-dashboard"];

dashboard.logo = "/logo_doang.png";
dashboard.title = "Bimasoft";
dashboard.subtitle = "Client Area";

dashboard.links = [
  {
    title: "Contact",
    icon: "/icons/wa.svg",
    link: "https://wa.me/6282340039781",
  },
];
dashboard.sidebar = {
  Home: [
    {
      title: "Dashboard",
      icon: "/icons/dashboard.svg",
      link: "/main",
    },
  ],
};
```

#### Data Table

```typescript
await customElements.whenDefined("cs-data-table"); //wait for the component to be defined before using it
const table = document.getElementById("table-invoice") as CSElement<{
  name: string;
  title: string;
}>["cs-data-table"];

table.columns = [
  { key: "name", title: "Name" },
  { key: "title", title: "Title" },
];
```

## How to use

### Input

```html
<cs-input
  icon="user"
  id="name"
  type="text"
  label="Name"
  value="Satu"
></cs-input>

<script>
  document.getElementById("name").onchange = (e) => {
    console.log(e.target.value); // get value
  };
</script>
```

**Attributes:**

| Attribute     | Type              | Description                                              |
| ------------- | ----------------- | -------------------------------------------------------- |
| `id`          | string            | **Required.** Unique identifier for the input            |
| `type`        | string            | Input type: `text`, `number`, `password`, `date`, `time` |
| `label`       | string            | Label text for the input                                 |
| `value`       | string            | Initial/default value                                    |
| `placeholder` | string            | Placeholder text                                         |
| `icon`        | string            | Icon name (see Icons section) or use `slot="icon"`       |
| `note`        | string \| boolean | Helper note displayed below the input                    |
| `readonly`    | string            | Makes the input readonly                                 |
| `mode`        | string            | Color mode: `dark` or default                            |
| `theme`       | string            | Style variant: `mui` (default), `tailwind`               |

**Events:**

| Event    | Description                        |
| -------- | ---------------------------------- |
| `change` | Fired when the input value changes |

**Input Types:**

1. **Text** - Standard text input
2. **Number** - Numeric input with validation
3. **Password** - Password input (masked)
4. **Date** - Date picker
5. **Time** - Time picker

**Example - MUI Theme (floating label):**

```html
<cs-input id="email" type="text" label="Email" theme="mui"></cs-input>
```

**Example - Tailwind Theme (static label):**

```html
<cs-input
  id="password"
  type="password"
  label="Password"
  theme="tailwind"
  placeholder="Enter password"
></cs-input>
```

**Example - With Icon:**

```html
<cs-input id="username" type="text" label="Username" icon="user"></cs-input>
```

**Example - Custom Icon Slot:**

```html
<cs-input id="search" type="text" label="Search">
  <div slot="icon"><i-c icon="search"></i-c></div>
</cs-input>
```

**Example - Dark Mode:**

```html
<cs-input id="dark-input" type="text" label="Dark Input" mode="dark"></cs-input>
```

### RTF (Rich Text Editor)

```html
<cs-rtf id="content" label="Content" value="<p>Hello World</p>"></cs-rtf>

<script>
  document.getElementById("content").onchange = (e) => {
    console.log(e.target.getContent()); // get HTML content
  };
</script>
```

**Attributes:**

| Attribute     | Type   | Description                                                                                                                                                                                                                                                                     |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | string | **Required.** Unique identifier for the editor                                                                                                                                                                                                                                  |
| `value`       | string | Initial HTML content                                                                                                                                                                                                                                                            |
| `label`       | string | Label text for the editor                                                                                                                                                                                                                                                       |
| `placeholder` | string | Placeholder text                                                                                                                                                                                                                                                                |
| `note`        | string | Helper note displayed below the editor                                                                                                                                                                                                                                          |
| `rows`        | number | Number of rows (default: 10)                                                                                                                                                                                                                                                    |
| `toolbar`     | string | Toolbar configuration (TinyMCE format). Refer to [Toolbar](https://www.tiny.cloud/docs/tinymce/latest/available-toolbar-buttons/). Default Toolbar is : `blocks \| bold italic backcolor \| alignleft aligncenter alignright alignjustify \| bullist numlist \| table \| image` |
| `server`      | string | Server URL for image uploads                                                                                                                                                                                                                                                    |
| `mode`        | string | Color mode: `dark` or default                                                                                                                                                                                                                                                   |

**Events:**

| Event    | Description                           |
| -------- | ------------------------------------- |
| `change` | Fired when the editor content changes |
| `ready`  | Fired when the editor is initialized  |

**Example - With Custom Toolbar:**

```html
<cs-rtf
  id="article"
  label="Article"
  toolbar="bold italic | alignleft aligncenter alignright | bullist numlist | link image"
></cs-rtf>
```

**Example - Image Upload:**

```html
<cs-rtf
  id="post"
  label="Post"
  toolbar="image"
  server="https://your-server.com/"
></cs-rtf>
```

**Example - Get Content:**

```javascript
const rtf = document.getElementById("content");

// Wait for editor to be ready
rtf.addEventListener("ready", (e) => {
  console.log("Editor ready", e.detail.editor);
});

// Get content on change
rtf.onchange = (e) => {
  const html = e.target.getContent();
  console.log(html);
};
```

### Toast

```html
<cs-toast></cs-toast>
```

```javascript
toast.success("Success message");
toast.push("Simple message");
toast.warn("Warning message");
toast.error("Error message");
toast.info("Information message");
toast.warning("Warning message");
toast.loading("Loading...");
toast.hide(); // or toast.dismiss()

// With duration and position
toast.success("Success!", 3000, "top-right");
```

**Methods:**

| Method    | Parameters                      | Description                     |
| --------- | ------------------------------- | ------------------------------- |
| `push`    | `message, duration?, position?` | Show primary toast              |
| `success` | `message, duration?, position?` | Show success toast              |
| `error`   | `message, duration?, position?` | Show error toast                |
| `warn`    | `message, duration?, position?` | Show warning toast              |
| `info`    | `message, duration?, position?` | Show info toast                 |
| `warning` | `message, duration?, position?` | Show warning toast              |
| `loading` | `message, position?`            | Show loading toast (indefinite) |
| `hide`    | -                               | Hide all toasts                 |
| `dismiss` | -                               | Hide all toasts                 |

**Parameters:**

- `message` - Toast message body
- `duration` - Duration in milliseconds (default: 3000)
- `position` - Position: `top-right`, `top-left`, `bottom-right`, `bottom-left` (default: `top-right`)

### Select

```html
<cs-select
  id="country"
  label="Country"
  data="Indonesia;USA;Singapore;Japan"
  data-value="ID;US;SG;JP"
  value="ID"
  placeholder="Select a country"
></cs-select>

<script>
  document.getElementById("country").onchange = (e) => {
    console.log(e.target.value); // get selected value
  };
</script>
```

**Attributes:**

| Attribute     | Type   | Description                             |
| ------------- | ------ | --------------------------------------- |
| `id`          | string | **Required.** Unique identifier         |
| `label`       | string | Label text                              |
| `data`        | string | Display options separated by semicolon  |
| `data-value`  | string | Optional value mapping (semicolon list) |
| `value`       | string | Selected value                          |
| `placeholder` | string | Placeholder text (default: "Select...") |

**Events:**

| Event    | Description                  |
| -------- | ---------------------------- |
| `change` | Fired when selection changes |

**Features:**

- Searchable dropdown with filter
- Keyboard navigation (Arrow keys, Enter, Escape)
- Click outside to close
- Selected item indicator

### Radio

```html
<cs-radio
  id="gender"
  label="Gender"
  data="Male;Female;Other"
  data-value="M;F;O"
  value="M"
></cs-radio>

<script>
  document.getElementById("gender").onchange = (e) => {
    console.log(e.target.value); // get selected value
  };
</script>
```

**Attributes:**

| Attribute     | Type           | Description                                                                                                                                             |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`          | string         | **Required.** Unique identifier                                                                                                                         |
| `label`       | string         | Label text                                                                                                                                              |
| `data`        | string         | Options separated by `;#;` or `;`                                                                                                                       |
| `data-value`  | string         | Value mapping (semicolon-separated)                                                                                                                     |
| `value`       | string         | Selected value(s)                                                                                                                                       |
| `type`        | string         | Input type: `radio` (default), `checkbox`                                                                                                               |
| `cols`        | number         | Number of columns (default: 1)                                                                                                                          |
| `note`        | string         | Helper note displayed below the label                                                                                                                   |
| `max-checked` | number\|string | Max number of checkboxes that can be selected (checkbox type only). UI-only constraint — programmatic `setAttribute("value", …)` writes are not capped. |

**Events:**

| Event    | Description                  |
| -------- | ---------------------------- |
| `change` | Fired when selection changes |

**Example - Checkbox:**

```html
<cs-radio
  id="hobbies"
  label="Hobbies"
  type="checkbox"
  data="Reading;Sports;Music;Travel"
  cols="2"
></cs-radio>
```

### Upload

```html
<cs-upload id="avatar" label="Avatar" limit="2"></cs-upload>

<script>
  document.getElementById("avatar").onchange = (e) => {
    console.log(e.target.value); // get uploaded file URL
  };
</script>
```

**Attributes:**

| Attribute | Type   | Description                                              |
| --------- | ------ | -------------------------------------------------------- |
| `id`      | string | **Required.** Unique identifier                          |
| `label`   | string | Label text                                               |
| `value`   | string | Initial/pre-filled file URL                              |
| `note`    | string | Helper note displayed below                              |
| `limit`   | number | Max file size in MB (0 = unlimited)                      |
| `server`  | string | Upload server URL                                        |
| `folder`  | string | on what folder the file will be added. e.g. `2026/april` |
| `mode`    | string | Color mode: `dark` or default                            |

**Events:**

| Event    | Description                         |
| -------- | ----------------------------------- |
| `change` | Fired when file is uploaded/removed |

**Features:**

- Drag and drop support
- Click to browse
- Progress bar
- Image/file preview
- Remove uploaded file
- File size validation

**Supported File Types:**

- Images: JPG, JPEG, PNG, GIF
- Documents: PDF, DOC, DOCX, XLS, XLSX

### Modal

```html
<cs-modal
  id="modal1"
  title="Modal Title"
  width="640px"
  confirm-text="Save Changes"
>
  <p>Modal content goes here...</p>
</cs-modal>

<button id="openModal">Open Modal</button>

<script>
  const modal = document.getElementById("modal1");
  const openBtn = document.getElementById("openModal");

  openBtn.addEventListener("click", () => {
    modal.show();
  });

  modal.addEventListener("close", () => {
    console.log("Modal closed");
  });

  modal.addEventListener("confirm", () => {
    console.log("Modal confirmed!");
  });

  // Or use callbacks
  modal.confirm = () => {
    console.log("Confirmed via callback");
  };

  modal.close = () => {
    console.log("Closed via callback");
  };
</script>
```

**Attributes:**

| Attribute      | Type   | Description                                                           |
| -------------- | ------ | --------------------------------------------------------------------- |
| `open`         | string | Open state attribute. If present, the modal is shown.                 |
| `title`        | string | Optional title text shown at the top of the modal content area.       |
| `width`        | string | Custom modal width (e.g. `420px`, `640px`, `70vw`). Default: `600px`. |
| `confirm-text` | string | Optional confirm button label. Default: `Save changes`.               |

> **Note:** Modal width is capped with `max-width: 90%` so it remains responsive on small screens. Modal content height is capped at `max-height: 90vh` and the body area scrolls independently, so tall content never overflows the viewport.
> **Note:** Press `Escape` while modal is open to close it.

**Methods:**

| Method   | Description     |
| -------- | --------------- |
| `show()` | Open the modal  |
| `hide()` | Close the modal |

**Events:**

| Event     | Description                       |
| --------- | --------------------------------- |
| `close`   | Fired when modal is closed        |
| `confirm` | Fired when confirm button clicked |

**Properties:**

| Property  | Type     | Description                      |
| --------- | -------- | -------------------------------- |
| `confirm` | function | Callback for confirm button      |
| `close`   | function | Callback for close/cancel button |

### Dynamic Modal (`cs-modal-wrapper` / `alertModal`)

Add `<cs-modal-wrapper>` once to the page and then call `alertModal()` (or `csModal.alert()`) from anywhere to imperatively create and show a modal. The modal element is created, shown, and automatically removed from the DOM when it closes — no HTML markup needed.

```html
<!-- Add once, typically near </body> -->
<cs-modal-wrapper></cs-modal-wrapper>

<script>
  // Basic usage
  alertModal(
    "Confirm Delete",
    "<p>Are you sure you want to delete this item?</p>",
    () => {
      console.log("Confirmed!");
    },
  );

  // With options
  alertModal(
    "Edit Profile",
    `<cs-input id="name" label="Name" value="John"></cs-input>`,
    () => {
      console.log("Saved:", getVal("name"));
    },
    { confirmText: "Save", width: "480px" },
  );

  // Alias
  csModal.alert("Hello", "<p>World</p>");
</script>
```

**`alertModal(title, content, callback?, options?)`**

| Parameter  | Type       | Description                                                             |
| ---------- | ---------- | ----------------------------------------------------------------------- |
| `title`    | `string`   | Modal title text.                                                       |
| `content`  | `string`   | **Trusted** HTML string for the modal body. Do not pass raw user input. |
| `callback` | `function` | Optional. Called when the confirm button is clicked.                    |
| `options`  | `object`   | Optional. `{ confirmText?: string, width?: string }`.                   |

Returns the `CSModalElement` instance so you can attach additional event listeners.

> **Security note:** `content` is injected via `innerHTML`. Only pass developer-controlled strings — never raw user input.

### Data Table

```html
<cs-data-table
  id="users-table"
  title="Users"
  page-size="10"
  download="true"
  import="true"
></cs-data-table>

<script>
  const table = document.getElementById("users-table");

  table.columns = [
    { key: "name", title: "Name", type: "text" },
    { key: "age", title: "Age", type: "number" },
    {
      key: "role",
      title: "Role",
      type: "select",
      data: "Admin;Editor;Viewer",
      dataValue: "ADM;EDT;VWR",
    },
    {
      key: "status",
      title: "Status",
      type: "radio",
      data: "Active;Inactive",
      dataValue: "A;I",
    },
    { key: "bio", title: "Bio", type: "rtf" },
  ];

  table.data = [
    {
      name: "Alya",
      age: 29,
      role: "Admin",
      status: "Active",
      bio: "<p>Hi</p>",
    },
  ];

  table.onAdd = (payload) => payload;
  table.onEdit = (payload, previous, rowIndex) => payload;
  table.onDelete = (row, rowIndex) => true;
</script>
```

**Attributes:**

| Attribute           | Type   | Description                                            |
| ------------------- | ------ | ------------------------------------------------------ |
| `title`             | string | Header title shown above the table                     |
| `columns`           | string | JSON string array of column definitions                |
| `data`              | string | JSON string array of row objects                       |
| `page-size`         | number | Initial rows per page                                  |
| `page-size-options` | string | Comma-separated page size list (example: `5,10,20,50`) |
| `download`          | string | `true`/`false`, show XLSX download button when `true`  |
| `import`            | string | `true`/`false`, show XLSX import button when `true`    |

**Properties:**

| Property   | Type     | Description                                                                                                                                                                                                                                                                                                           |
| ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `columns`  | array    | Column definition array (preferred over `columns` attribute)                                                                                                                                                                                                                                                          |
| `data`     | array    | Row data array (preferred over `data` attribute)                                                                                                                                                                                                                                                                      |
| `onAdd`    | function | Custom add handler: `(payload) => payload \| false \| void`. Return `false` to cancel; return a modified `payload` object to override it; return nothing to use the original payload.                                                                                                                                 |
| `onEdit`   | function | Custom edit handler: `(payload, previous, rowIndex) => payload \| false \| void`. `payload` contains only visible + `hideColumn` fields; `previous` contains the full original row including `hidden` columns. Return `false` to cancel; return a modified `payload` to override; return nothing to use the original. |
| `onDelete` | function | Custom delete handler: `(row, rowIndex) => boolean \| void`. Return `false` to cancel; return `true` or nothing to proceed.                                                                                                                                                                                           |

**Events:**

| Event            | Description                                      |
| ---------------- | ------------------------------------------------ |
| `add`            | Fired after a row is added                       |
| `edit`           | Fired after a row is edited                      |
| `delete`         | Fired after a row is deleted                     |
| `delete-checked` | Fired after Delete Checked removes selected rows |
| `import`         | Fired after XLSX import is processed             |

**Built-in Features:**

- Text filter for all visible columns
- Click column header to sort (`asc` -> `desc` -> `reset`)
- Pagination with page list
- Rows-per-page selector
- Row checkbox selection and iconized Delete Checked action
- Delete Checked is disabled (grey state) when no rows are selected
- Add/Edit modal form generated from column definitions
- Delete action uses `cs-modal` confirmation (single and bulk), with confirm button text `Delete`
- Optional Import and Download buttons with icons
- XLSX Download exports raw source data (`data`) and not renderer output
- XLSX Import opens modal with structure instructions, example-file download, and confirm button text `Import File`
- XLSX Import inserts rows through `onAdd` callback (required)
- Add/Edit/Delete buttons are optional and only shown when `onAdd`, `onEdit`, `onDelete` are set
- Add button uses icon + label, while row Edit/Delete actions use icon-only buttons
- Action column (Edit/Delete) is sticky/pinned to the right side of the table so it remains visible when scrolling horizontally

**Column Definition:**

```ts
{
  key: string;
  title: string;
  type?: "text" | "number" | "password" | "date" | "time" | "select" | "radio" | "checkbox" | "upload" | "rtf";
  data?: string | string[]; // required by select/radio/checkbox
  dataValue?: string | string[]; // optional value mapping for select/radio/checkbox
  renderer?: (value: string, payload: Record<string, any>, rowIndex: number, column: DataTableColumn) => string;
  readonly?: boolean;
  placeholder?: string;
  note?: string;
  hidden?: boolean; // hides column from table AND add/edit modals; still included in download and import
  hideColumn?: boolean; // hides column from table view only; still shown in add/edit modals, download, and import
}
```

> **Filter note:** The filter input only matches against visible columns. Columns marked `hidden` or `hideColumn` are excluded from filter matching.

**Custom Renderer Example:**

```javascript
table.columns = [
  {
    key: "website",
    title: "Website",
    type: "text",
    renderer: (s) =>
      `<a href="${s}" target="_blank" rel="noopener noreferrer">Link</a>`,
  },
];
```

> `renderer` affects how the table cell is displayed and is also included in filter matching. It does not change the underlying stored value used by add/edit forms.

**Type Notes:**

- `text`, `number`, `password`, `date`, `time` use `cs-input`
- `select` uses `cs-select` with `data` and optional `dataValue`
- `radio` and `checkbox` use `cs-radio` with `data` and optional `dataValue`
- `upload` uses `cs-upload`
- `rtf` uses `cs-rtf`

### Login Google

**Setup:**

1. Add your domain to Authorized JavaScript origins in [Google Cloud Console](https://console.cloud.google.com/apis/credentials/oauthclient/)
2. Include the script and component in your HTML:

```html
<script
  src="https://pages-github.b-cdn.net/webcomponents/login-google.js"
  defer
></script>
<login-google
  verifurl="http://localhost:3000/verify"
  redirecturl="http://localhost:3000/dashboard"
  clientid="YOUR_CLIENT_ID.apps.googleusercontent.com"
></login-google>
```

> **Note:** The `defer` attribute on the script tag is important to ensure the DOM is ready before the component initializes.

**Attributes:**

| Attribute     | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `verifurl`    | string | Backend endpoint to verify the Google token |
| `redirecturl` | string | URL to redirect after successful login      |
| `clientid`    | string | Your Google OAuth2 client ID                |

**Backend Verification (Next.js Example):**

The `verifurl` endpoint should verify the Google token and return a JWT.

```typescript
// login-google-verifexample/nextjs/route.ts
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const OPTIONS = async () => {
  return NextResponse.json({ status: "ok" });
};

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

async function verify(token: string, clientid: string) {
  await client.verifyIdToken({
    idToken: token,
    audience: clientid,
  });
}

export const POST = async (
  req: NextRequest,
  { params }: { params: { [s: string]: string } },
) => {
  try {
    const body = await req.json();
    const { token, clientid }: { [key: string]: string } = body;

    try {
      await verify(token, clientid);

      const decoded: { email: string } = decodeJwt(token);
      const email: string = decoded.email;

      // Login Berhasil, generate your own JWT token
      return NextResponse.json({ status: "ok", token: "YOUR_JWT_TOKEN" });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ status: "error" });
    }
  } catch (error) {
    return NextResponse.json({ err: (error as any).toString() });
  }
};
```

**Flow:**

1. User clicks the Google Sign-In button
2. Google returns a credential token
3. The component sends the token to your `verifurl` endpoint
4. Your backend verifies the token with Google and returns a JWT
5. The JWT is stored in `localStorage` and the user is redirected to `redirecturl`

### Dashboard

```html
<cs-dashboard id="dashboard">
  <div class="content">
    <!-- Your dashboard content goes here -->
  </div>
</cs-dashboard>

<script src="https://pages-github.b-cdn.net/webcomponents/modules/cs-dashboard.js"></script>
<script>
  const dashboard = document.getElementById("dashboard");

  dashboard.logo = "https://placehold.co/64x64/EEE/31343C?text=CS";
  dashboard.title = "CS Dashboard";
  dashboard.subtitle = "Admin Panel";
  dashboard.breadcrumb = ["Dashboard", "Overview"];

  dashboard.sidebar = {
    Platform: [
      {
        title: "Playground",
        icon: "https://placehold.co/36x36/EEE/31343C?text=P",
        link: "#",
        childs: [
          { title: "Sub Menu 1", link: "/somepage" },
          { title: "Sub Menu 2", link: "/anotherpage" },
        ],
      },
      {
        title: "Projects",
        link: "/someotherpage/",
        icon: "https://placehold.co/36x36/EEE/31343C?text=PR",
      },
      {
        title: "Analytics",
        link: "/analytics",
        icon: "https://placehold.co/36x36/EEE/31343C?text=A",
      },
    ],
    Settings: [
      {
        title: "Profile",
        link: "/profile",
        icon: "https://placehold.co/36x36/EEE/31343C?text=U",
      },
      {
        title: "Preferences",
        link: "/preferences",
        icon: "https://placehold.co/36x36/EEE/31343C?text=S",
      },
    ],
  };

  // Set active menu item (triggers smooth icon color animation)
  dashboard.activePath = "/analytics";
</script>
```

**Properties:**

| Property     | Type   | Description                                                                                          |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------- |
| `logo`       | string | URL to the logo image. If not provided, a placeholder with the first letter of the title is shown.   |
| `title`      | string | The main title of the dashboard.                                                                     |
| `subtitle`   | string | Optional subtitle for the dashboard.                                                                 |
| `breadcrumb` | array  | Array of breadcrumb items for navigation.                                                            |
| `sidebar`    | object | Sidebar navigation structure with sections and items.                                                |
| `activePath` | string | Sets the active menu item by matching the link. Updates without re-rendering to preserve animations. |

**Sidebar Structure:**

The `sidebar` property accepts an object where:

- Keys are section titles (e.g., "Platform", "Settings")
- Values are arrays of navigation items

Each navigation item can have:

- `title` (string): The display text
- `link` (string): The navigation link
- `icon` (string, optional): URL to the icon image (SVG icons are automatically recolored with animation)
- `childs` (array, optional): Array of submenu items with `title` and `link`

**Events:**

| Event              | Description                              | Detail                            |
| ------------------ | ---------------------------------------- | --------------------------------- |
| `breadcrumb-click` | Fired when a breadcrumb item is clicked. | `{ index: number, item: string }` |

**Event Example:**

```javascript
dashboard.addEventListener("breadcrumb-click", (e) => {
  const { index, item } = e.detail;
  console.log(`Clicked: ${item} at index ${index}`);
  // Handle navigation based on index
});
```

**Features:**

- Responsive design (desktop and mobile)
- Collapsible sidebar on desktop
- Slide-out sidebar on mobile
- Expandable submenu items
- Breadcrumb navigation with click events
- Slotted content area for custom dashboard content

### Sortable

A drag-and-drop reorderable list. Children are wrapped automatically — any HTML content can be used as items.

```html
<script type="module" src="modules/submodules/sortable.js"></script>

<cs-sortable id="my-list" deleteable="true" insertable="true">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</cs-sortable>

<script>
  const list = document.getElementById("my-list");

  // Listen for new item requests
  list.addEventListener("cs-insert", () => {
    const item = document.createElement("div");
    item.textContent = "New item";
    list.appendChild(item);
  });

  list.addEventListener("cs-reorder", (e) => {
    console.log("Moved from", e.detail.from, "to", e.detail.to);
    console.log("New order:", e.detail.items);
  });

  list.addEventListener("cs-delete", (e) => {
    console.log("Deleted index", e.detail.index, e.detail.item);
  });
</script>
```

**Attributes:**

| Attribute    | Type                | Description                                                         |
| ------------ | ------------------- | ------------------------------------------------------------------- |
| `deleteable` | boolean or `"true"` | Show a trash icon button on each item. Toggle at any time.          |
| `insertable` | boolean or `"true"` | Show an "+ Add item" button at the bottom. Click fires `cs-insert`. |

**Events:**

| Event        | Detail                                           | Description                                |
| ------------ | ------------------------------------------------ | ------------------------------------------ |
| `cs-reorder` | `{ from: number, to: number, items: Element[] }` | Fired after a drag-and-drop reorder        |
| `cs-delete`  | `{ index: number, item: Element }`               | Fired after an item is deleted             |
| `cs-insert`  | `{}`                                             | Fired when the "+ Add item" button clicked |

**Properties:**

| Property | Type        | Description                                          |
| -------- | ----------- | ---------------------------------------------------- |
| `items`  | `Element[]` | Read-only. Returns the current ordered item elements |

**Example - Read current order:**

```javascript
const list = document.getElementById("my-list");

// Get current order of original child elements
console.log(list.items.map((el) => el.textContent));
```

**Example - Toggle deleteable dynamically:**

```javascript
list.setAttribute("deleteable", "true"); // show delete buttons
list.setAttribute("deleteable", "false"); // hide delete buttons
```

**Features:**

- Native HTML5 drag-and-drop (no external libraries)
- Any HTML content as items — uses `<slot>` for content projection
- Auto-wraps children with grip handle on `slotchange`
- New children appended at runtime are also auto-wrapped
- `deleteable` and `insertable` can be toggled dynamically at any time
- Shadcn/Tailwind-style border and row appearance
- Drag-over indicator (blue top border on drop target)
- Dragging item shown at reduced opacity

### Icons

```
<i-c icon="close" color="#fff"></i-c>
```

Available icons :

[Icons Page](https://pages-github.b-cdn.net/webcomponents/modules/submodules/test-page/test-icons.html)

### Image Positioner

A component that displays an A4-sized background (image or PDF) and lets the user drag an overlay/stamp image anywhere on top of it. A **Save** button fires a `save` event returning the overlay center position as a percentage of the background dimensions.

```html
<script type="module" src="modules/submodules/image-positioner.js"></script>

<cs-image-positioner
  id="positioner"
  src="https://example.com/background.jpg"
  overlay="https://example.com/stamp.png"
  overlay-width="80"
  x="50"
  y="50"
></cs-image-positioner>

<script>
  const el = document.getElementById("positioner");

  el.addEventListener("save", (e) => {
    console.log(e.detail); // { x: 42.5, y: 30.0 }
  });

  // Programmatic position control
  el.x = 25;
  el.y = 75;

  // Read current position
  const { x, y } = el.getPosition();
  console.log(x, y);

  // Restore position via attribute
  el.setAttribute("x", "30");
  el.setAttribute("y", "60");
</script>
```

**Attributes:**

| Attribute       | Type   | Description                                                          |
| --------------- | ------ | -------------------------------------------------------------------- |
| `src`           | string | URL of the background image or PDF (A4 proportion, ~794×1123 px)     |
| `overlay`       | string | URL of the overlay/stamp image                                       |
| `x`             | number | Center X of overlay as % of background width (0–100). Default: `50`  |
| `y`             | number | Center Y of overlay as % of background height (0–100). Default: `50` |
| `overlay-width` | number | Width of the overlay image in px. Default: `80`                      |
| `type`          | string | Force rendering mode: `"pdf"` or `"image"` (auto-detected otherwise) |

**Events:**

| Event  | Detail                     | Description                                         |
| ------ | -------------------------- | --------------------------------------------------- |
| `save` | `{ x: number, y: number }` | Fired when Save button clicked; x/y are percentages |

**Properties / Methods:**

| Property / Method | Type       | Description                                      |
| ----------------- | ---------- | ------------------------------------------------ |
| `x`               | number     | Get or set overlay center X position (%)         |
| `y`               | number     | Get or set overlay center Y position (%)         |
| `getPosition()`   | `{ x, y }` | Returns current overlay center as `{ x, y }` (%) |

**Features:**

- A4-proportioned background container (794 × 1123 px, scales down via `max-width: 100%`)
- PDF `src` fetched as a blob (bypasses `Content-Disposition: attachment`) and embedded via `<embed>` — falls back to direct URL on CORS/network errors
- Image `src` rendered in an `<img>`
- Overlay image draggable within background bounds — mouse and touch friendly
- **Keyboard accessible**: focus the overlay and use **Arrow keys** to nudge position (hold Shift for 5× steps)
- Overlay stays clamped inside the background area during drag
- Position attributes (`x`, `y`) are updated after each drag ends
- Setting `x`/`y` property or attribute programmatically moves the overlay immediately
- Rapid `src` changes are safe — stale PDF fetches are cancelled via load tokens

### Matching

A web component for matching exercises (e.g. exam questions). It renders two lists side-by-side and lets the user draw SVG lines connecting items in a one-to-one relationship.

```html
<script type="module" src="modules/submodules/matching.js"></script>

<cs-matching
  id="q1"
  title="Match each capital city to its country."
  submit-text="Check Answers"
>
  <div slot="left">Paris</div>
  <div slot="left">Berlin</div>
  <div slot="left">Rome</div>
  <div slot="right">France</div>
  <div slot="right">Germany</div>
  <div slot="right">Italy</div>
</cs-matching>

<script>
  const q1 = document.getElementById("q1");

  q1.addEventListener("submit", (e) => {
    console.log(e.detail.matches);
    // [{ leftIndex: 0, rightIndex: 0 }, ...]
  });

  q1.addEventListener("change", (e) => {
    console.log("current matches:", e.detail.matches);
  });
</script>
```

**Attributes:**

| Attribute     | Type   | Description                                                         |
| ------------- | ------ | ------------------------------------------------------------------- |
| `title`       | string | Optional label shown above the component                            |
| `submit-text` | string | Submit button label. Default: `"Submit"`                            |
| `readonly`    | string | If present (or `"true"`), disables interaction and hides the button |

**Events:**

| Event    | Detail                                                        | Description                                 |
| -------- | ------------------------------------------------------------- | ------------------------------------------- |
| `submit` | `{ matches: Array<{leftIndex: number, rightIndex: number}> }` | Fired when the Submit button is clicked     |
| `change` | `{ matches: Array<{leftIndex: number, rightIndex: number}> }` | Fired after each connection is made/removed |

**Properties and Methods:**

| Member            | Type / Signature                                                    | Description                                 |
| ----------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| `matches`         | `Array<{leftIndex: number, rightIndex: number}>` (read-only getter) | Returns a copy of the current matched pairs |
| `value`           | getter/setter alias of `matches`                                    | Get or set current matches                  |
| `setMatches(arr)` | `(arr: Array<{leftIndex, rightIndex}>) => void`                     | Programmatically apply a set of matches     |
| `clearMatches()`  | `() => void`                                                        | Remove all connections                      |

**Example — Restore saved state:**

```javascript
const q1 = document.getElementById("q1");

// Restore from previously saved answer
q1.setMatches([
  { leftIndex: 0, rightIndex: 2 },
  { leftIndex: 1, rightIndex: 0 },
]);

// Or via setter
q1.value = [{ leftIndex: 0, rightIndex: 0 }];

// Read current state
console.log(q1.matches);

// Clear all lines
q1.clearMatches();
```

**Example — Readonly (show correct answers):**

```html
<cs-matching id="answer-key" readonly>
  <div slot="left">Paris</div>
  <div slot="left">Berlin</div>
  <div slot="right">France</div>
  <div slot="right">Germany</div>
</cs-matching>

<script>
  document.getElementById("answer-key").setMatches([
    { leftIndex: 0, rightIndex: 0 },
    { leftIndex: 1, rightIndex: 1 },
  ]);
</script>
```

**Features:**

- Left and right list items support arbitrary HTML (passed via `slot="left"` / `slot="right"`)
- Click **or press Enter/Space** on a left-side dot, then a right-side dot to draw a colored SVG bezier line
- **Keyboard accessible**: all dots have `tabindex="0"`, `role="button"`, and `aria-label` — fully navigable by keyboard
- `aria-pressed` on dots reflects matched/unmatched state for screen readers
- Clicking an already-connected dot removes that connection (toggle)
- One-to-one constraint — making a new connection replaces any prior connection on either side
- 8-color palette (red, blue, green, orange, purple, pink, teal, amber) cycles for each line
- SVG overlay with `pointer-events: none` keeps items fully interactive
- Lines redraw automatically on resize (debounced via `requestAnimationFrame`)
- `readonly` mode disables all interaction; lines remain visible
- `setMatches()` validates that provided indices are within bounds

```

```

### Dropdown Button

A trigger button that opens a dropdown menu of clickable items. Unlike `<cs-select>`, clicking an item fires an action rather than selecting a value.

```html
<script type="module" src="modules/submodules/dropdown-button.js"></script>

<cs-dropdown-button
  id="actions"
  label="Actions"
  icon="settings"
  items='[
    {"label":"Edit","icon":"edit"},
    {"label":"Download","icon":"download"},
    {"label":"Delete","icon":"delete","danger":true}
  ]'
></cs-dropdown-button>

<script>
  document.getElementById("actions").addEventListener("cs-click", (e) => {
    console.log(e.detail.label); // "Edit"
    console.log(e.detail.value); // "Edit" (or custom value if set)
    console.log(e.detail.index); // 0
    console.log(e.detail.item); // full item object
  });
</script>
```

**Attributes:**

| Attribute   | Type   | Default         | Description                                                                    |
| ----------- | ------ | --------------- | ------------------------------------------------------------------------------ |
| `label`     | string | `"Actions"`     | Text shown on the trigger button                                               |
| `icon`      | string | —               | Icon name for the trigger button (see Icons section)                           |
| `items`     | string | `"[]"`          | JSON array of `DropdownButtonItem` objects                                     |
| `placement` | string | `"bottom-left"` | Where the menu appears: `bottom-left`, `bottom-right`, `top-left`, `top-right` |
| `variant`   | string | `"primary"`     | Trigger button style: `primary`, `secondary`, `ghost`, `danger`                |
| `size`      | string | `"md"`          | Button size: `sm`, `md`, `lg`                                                  |
| `disabled`  | —      | —               | When present, disables the trigger button                                      |

**Item object (`DropdownButtonItem`):**

| Field      | Type    | Description                                            |
| ---------- | ------- | ------------------------------------------------------ |
| `label`    | string  | **Required.** Display text of the item                 |
| `value`    | string  | Optional custom value (defaults to `label`)            |
| `icon`     | string  | Optional icon name shown before the label              |
| `disabled` | boolean | Greys-out and prevents clicking the item               |
| `danger`   | boolean | Renders the item in red to signal a destructive action |
| `divider`  | string  | `"before"` or `"after"` — adds a separator line        |

**Events:**

| Event      | Detail                          | Description                       |
| ---------- | ------------------------------- | --------------------------------- |
| `cs-click` | `{ label, value, index, item }` | Fired when a menu item is clicked |

**Methods:**

| Method    | Signature    | Description                         |
| --------- | ------------ | ----------------------------------- |
| `open()`  | `() => void` | Programmatically open the dropdown  |
| `close()` | `() => void` | Programmatically close the dropdown |

**Properties:**

| Method  | Type                   | Description                |
| ------- | ---------------------- | -------------------------- |
| `items` | `DropdownButtonItem[]` | Programmatically add items |

**Example — With danger item and divider:**

```html
<cs-dropdown-button
  label="File"
  icon="document"
  variant="secondary"
  items='[
    {"label":"New","icon":"add"},
    {"label":"Save","icon":"save","divider":"after"},
    {"label":"Delete","icon":"delete","danger":true}
  ]'
></cs-dropdown-button>
```

**Example — Programmatic control:**

```javascript
const btn = document.getElementById("my-dropdown");
btn.open(); // open menu
btn.close(); // close menu
btn.setItems([
  { label: "Refresh", icon: "refresh" },
  { label: "Settings", icon: "settings" },
]);
```

**Features:**

- Supports icons from the built-in icon set on both the trigger button and each menu item
- Danger items render in red with a red hover background
- Dividers (`"before"` / `"after"`) insert a horizontal separator line
- Disabled items are greyed out and unclickable
- Four placement options: `bottom-left`, `bottom-right`, `top-left`, `top-right`
- Three size variants: `sm`, `md`, `lg`
- Four colour variants: `primary`, `secondary`, `ghost`, `danger`
- Click outside or press **Escape** to close; **ArrowUp / ArrowDown** to navigate items; **Tab** closes the menu
- Fully accessible: `aria-haspopup="menu"`, `aria-expanded`, `role="menu"`, `role="menuitem"`
- `open()` / `close()` programmatic API

### Countdown

```html
<cs-countdown date="2026-12-31" label="New Year 2027"></cs-countdown>
```

With optional time (defaults to `00:00:00`):

```html
<cs-countdown
  date="2026-06-15"
  time="18:30:00"
  label="June 15 at 6:30 PM"
  expired-text="Event has started!"
></cs-countdown>
```

**Attributes:**

| Attribute      | Type   | Description                                                                                                      |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `date`         | string | **Required.** Target date in `YYYY-MM-DD` format                                                                 |
| `time`         | string | Optional target time in `HH:MM:SS` format (default `00:00:00`)                                                   |
| `label`        | string | Optional heading displayed above the timer                                                                       |
| `expired-text` | string | Text shown when countdown reaches zero (default `Countdown finished!`). Ignored when child elements are slotted. |

**Slot:**

Place child elements inside `<cs-countdown>` to display custom content when the timer expires. If children are present they take precedence over the `expired-text` attribute.

```html
<cs-countdown date="2020-01-01">
  <div>🎉 The event has ended! <a href="#">Learn more</a></div>
</cs-countdown>
```

**Events:**

| Event        | Detail | Description                             |
| ------------ | ------ | --------------------------------------- |
| `cs-expired` | `{}`   | Fired once when the countdown reaches 0 |

**Example — listen for expiry:**

```javascript
document.getElementById("my-countdown").addEventListener("cs-expired", () => {
  console.log("Time is up!");
});
```

**Example — update target dynamically:**

```javascript
const cd = document.getElementById("my-countdown");
cd.setAttribute("date", "2027-01-01");
cd.setAttribute("time", "00:00:00");
```
