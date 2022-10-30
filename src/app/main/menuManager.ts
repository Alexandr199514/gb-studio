import { Menu } from "electron";
import settings from "electron-settings";
import l10n from "lib/helpers/l10n";
import WindowManager from "./windowManager";

type ListenerFn = (...args: unknown[]) => void;

interface MenuManagerProps {
  windowManager: WindowManager;
}

const isDevMode = !!process.execPath.match(/[\\/]electron/);

const locales = [] as const;

export default class MenuManager {
  windowManager: WindowManager;

  listeners = {
    new: [] as ListenerFn[],
    open: [] as ListenerFn[],
    project: [] as ListenerFn[],
    save: [] as ListenerFn[],
    saveAs: [] as ListenerFn[],
    checkUpdates: [] as ListenerFn[],
    undo: [] as ListenerFn[],
    redo: [] as ListenerFn[],
    section: [] as ListenerFn[],
    zoom: [] as ListenerFn[],
    reloadAssets: [] as ListenerFn[],
    updateSetting: [] as ListenerFn[],
    run: [] as ListenerFn[],
    build: [] as ListenerFn[],
    ejectEngine: [] as ListenerFn[],
    exportProjectSrc: [] as ListenerFn[],
    exportProjectData: [] as ListenerFn[],
    pasteInPlace: [] as ListenerFn[],
    preferences: [] as ListenerFn[],
    openMusic: [] as ListenerFn[],
  };

  constructor({ windowManager }: MenuManagerProps) {
    this.windowManager = windowManager;
  }

  notifyListeners(event: keyof typeof this.listeners, ...data: unknown[]) {
    for (const fn of this.listeners[event]) {
      fn(...data);
    }
  }

  on(event: keyof typeof this.listeners, fn: ListenerFn) {
    this.listeners[event].push(fn);
  }

  off(event: keyof typeof this.listeners, fn: ListenerFn) {
    this.listeners[event] = this.listeners[event].filter((f) => f !== fn);
  }

  start() {}

  buildMenu = async (plugins = []) => {
    const template = [
      {
        label: l10n("MENU_FILE"),
        submenu: [
          {
            label: l10n("MENU_NEW_PROJECT"),
            accelerator: "CommandOrControl+N",
            click: () => {
              //   notifyListeners("new");
            },
          },
          {
            label: l10n("MENU_OPEN"),
            accelerator: "CommandOrControl+O",
            click: () => {
              //   notifyListeners("open");
            },
          },
          {
            label: l10n("MENU_SWITCH_PROJECT"),
            accelerator: "CommandOrControl+P",
            click: () => {
              //   notifyListeners("project");
            },
          },
          {
            label: l10n("MENU_SAVE"),
            accelerator: "CommandOrControl+S",
            click: () => {
              //   notifyListeners("save");
            },
          },
          {
            label: l10n("MENU_SAVE_AS"),
            accelerator: "CommandOrControl+Alt+S",
            click: () => {
              //   notifyListeners("saveAs");
            },
          },

          { type: "separator" },
          {
            label: l10n("MENU_RELOAD_ASSETS"),
            accelerator: "CommandOrControl+Shift+R",
            click: () => {
              //   notifyListeners("reloadAssets");
            },
          },
          { type: "separator" },
          { role: "close", label: l10n("MENU_CLOSE") },
        ],
      },
      {
        label: l10n("MENU_EDIT"),
        submenu: [
          {
            label: l10n("MENU_UNDO"),
            accelerator: "CommandOrControl+Z",
            click: () => {
              //   notifyListeners("undo");
            },
          },
          {
            label: l10n("MENU_REDO"),
            accelerator: "CommandOrControl+Shift+Z",
            click: () => {
              //   notifyListeners("redo");
            },
          },
          { type: "separator" },
          { role: "cut", label: l10n("MENU_CUT") },
          { role: "copy", label: l10n("MENU_COPY") },
          { role: "paste", label: l10n("MENU_PASTE") },
          {
            label: l10n("MENU_PASTE_IN_PLACE"),
            accelerator: "Shift+CommandOrControl+V",
            click: () => {
              //   notifyListeners("pasteInPlace");
            },
          },
          { role: "delete", label: l10n("MENU_DELETE") },
          { role: "selectall", label: l10n("MENU_SELECT_ALL") },
        ],
      },
      {
        label: l10n("MENU_GAME"),
        submenu: [
          {
            label: l10n("MENU_RUN"),
            accelerator: "CommandOrControl+B",
            click: () => {
              //   notifyListeners("run");
            },
          },
          {
            label: l10n("MENU_EXPORT_AS"),
            submenu: [
              {
                label: l10n("MENU_EXPORT_ROM"),
                accelerator: "CommandOrControl+Shift+B",
                click() {
                  //   notifyListeners("build", "rom");
                },
              },
              {
                label: l10n("MENU_EXPORT_WEB"),
                accelerator: "CommandOrControl+Shift+N",
                click() {
                  //   notifyListeners("build", "web");
                },
              },
              {
                label: l10n("MENU_EXPORT_POCKET"),
                accelerator: "CommandOrControl+Shift+M",
                click() {
                  //   notifyListeners("build", "pocket");
                },
              },
            ],
          },
          { type: "separator" },
          {
            label: l10n("MENU_ADVANCED"),
            submenu: [
              {
                label: l10n("MENU_EJECT_ENGINE"),
                click() {
                  //   notifyListeners("ejectEngine");
                },
              },
              { type: "separator" },
              {
                label: l10n("MENU_EJECT_PROJECT_BUILD"),
                click() {
                  //   notifyListeners("exportProjectSrc");
                },
              },
              {
                label: l10n("MENU_EJECT_PROJECT_DATA"),
                click() {
                  //   notifyListeners("exportProjectData");
                },
              },
            ],
          },
        ],
      },
      {
        label: l10n("MENU_VIEW"),
        submenu: [
          {
            label: l10n("MENU_GAME_WORLD"),
            accelerator: "CommandOrControl+1",
            click: () => {
              //   notifyListeners("section", "world");
            },
          },
          {
            label: l10n("MENU_SPRITES"),
            accelerator: "CommandOrControl+2",
            click: () => {
              //   notifyListeners("section", "sprites");
            },
          },
          {
            label: l10n("MENU_BACKGROUNDS"),
            accelerator: "CommandOrControl+3",
            click: () => {
              //   notifyListeners("section", "backgrounds");
            },
          },
          {
            label: l10n("MENU_MUSIC"),
            accelerator: "CommandOrControl+4",
            click: () => {
              //   notifyListeners("section", "music");
            },
          },
          {
            label: l10n("MENU_SFX"),
            accelerator: "CommandOrControl+5",
            click: () => {
              //   notifyListeners("section", "sounds");
            },
          },
          {
            label: l10n("MENU_PALETTES"),
            accelerator: "CommandOrControl+6",
            click: () => {
              //   notifyListeners("section", "palettes");
            },
          },
          {
            label: l10n("MENU_DIALOGUE_REVIEW"),
            accelerator: "CommandOrControl+7",
            click: () => {
              //   notifyListeners("section", "dialogue");
            },
          },
          {
            label: l10n("MENU_BUILD_AND_RUN"),
            accelerator: "CommandOrControl+8",
            click: () => {
              //   notifyListeners("section", "build");
            },
          },
          {
            label: l10n("MENU_SETTINGS"),
            accelerator: "CommandOrControl+9",
            click: () => {
              //   notifyListeners("section", "settings");
            },
          },
          { type: "separator" },
          {
            label: l10n("MENU_THEME"),
            submenu: [
              {
                id: "themeDefault",
                label: l10n("MENU_THEME_DEFAULT"),
                type: "checkbox",
                checked: settings.get("theme") === undefined,
                click() {
                  //   notifyListeners("updateSetting", "theme", undefined);
                },
              },
              { type: "separator" },
              {
                id: "themeLight",
                label: l10n("MENU_THEME_LIGHT"),
                type: "checkbox",
                checked: settings.get("theme") === "light",
                click() {
                  //   notifyListeners("updateSetting", "theme", "light");
                },
              },
              {
                id: "themeDark",
                label: l10n("MENU_THEME_DARK"),
                type: "checkbox",
                checked: settings.get("theme") === "dark",
                click() {
                  //   notifyListeners("updateSetting", "theme", "dark");
                },
              },
            ],
          },
          {
            label: l10n("MENU_LANGUAGE"),
            submenu: [
              {
                id: "localeDefault",
                label: l10n("MENU_LANGUAGE_DEFAULT"),
                type: "checkbox",
                checked: settings.get("locale") === undefined,
                click() {
                  // notifyListeners("updateSetting", "locale", undefined);
                },
              },
              { type: "separator" },
              ...locales.map((locale) => {
                return {
                  id: `locale-${locale}`,
                  label: locale,
                  type: "checkbox",
                  checked: settings.get("locale") === locale,
                  click() {
                    // notifyListeners("updateSetting", "locale", locale);
                  },
                };
              }),
            ],
          },
          { type: "separator" },
          {
            id: "showCollisions",
            label: l10n("MENU_SHOW_COLLISIONS"),
            type: "checkbox",
            checked: true,
            click: (item) => {
              //   notifyListeners("updateSetting", "showCollisions", item.checked);
            },
          },
          {
            label: l10n("MENU_SHOW_CONNECTIONS"),
            submenu: [
              {
                id: "showConnectionsAll",
                label: l10n("MENU_SHOW_CONNECTIONS_ALL"),
                type: "checkbox",
                checked: settings.get("showConnections") === "all",
                click() {
                  //   notifyListeners("updateSetting", "showConnections", "all");
                },
              },
              {
                id: "showConnectionsSelected",
                label: l10n("MENU_SHOW_CONNECTIONS_SELECTED"),
                type: "checkbox",
                checked:
                  settings.get("showConnections") === "selected" ||
                  settings.get("showConnections") === true,
                click() {
                  //   notifyListeners(
                  //     "updateSetting",
                  //     "showConnections",
                  //     "selected"
                  //   );
                },
              },
              { type: "separator" },
              {
                id: "showConnectionsNone",
                label: l10n("MENU_SHOW_CONNECTIONS_NONE"),
                type: "checkbox",
                checked: settings.get("showConnections") === false,
                click() {
                  //   notifyListeners("updateSetting", "showConnections", false);
                },
              },
            ],
          },
          {
            id: "showNavigator",
            label: l10n("MENU_SHOW_NAVIGATOR"),
            checked: settings.get("showNavigator") !== false,
            type: "checkbox",
            click: (item) => {
              //   notifyListeners("updateSetting", "showNavigator", item.checked);
            },
          },
          { type: "separator" },
          {
            label: l10n("MENU_ZOOM_RESET"),
            accelerator: "CommandOrControl+0",
            click: () => {
              //   notifyListeners("zoom", "reset");
            },
          },
          {
            label: l10n("MENU_ZOOM_IN"),
            accelerator: "CommandOrControl+=",
            click: () => {
              //   notifyListeners("zoom", "in");
            },
          },
          {
            label: l10n("MENU_ZOOM_OUT"),
            accelerator: "CommandOrControl+-",
            click: () => {
              //   notifyListeners("zoom", "out");
            },
          },
        ],
      },
      {
        role: "window",
        label: l10n("MENU_WINDOW"),
        submenu: [{ role: "minimize" }],
      },
      {
        role: "help",
        label: l10n("MENU_HELP"),
        submenu: [
          {
            label: l10n("MENU_DOCUMENTATION"),
            click() {
              shell.openExternal("https://www.gbstudio.dev/docs/");
            },
          },
          {
            label: l10n("MENU_LEARN_MORE"),
            click() {
              shell.openExternal("https://www.gbstudio.dev");
            },
          },
        ],
      },
    ];

    if (plugins && plugins.length > 0) {
      template.splice(3, 0, {
        id: "plugins",
        label: l10n("MENU_PLUGINS"),
        submenu: plugins,
      });
    }

    if (isDevMode) {
      template[template.length - 3].submenu.push({ type: "separator" });
      template[template.length - 3].submenu.push({
        label: "Debug",
        submenu: [
          { role: "reload" },
          { role: "forcereload" },
          { role: "toggledevtools" },
          {
            label: l10n("MENU_OPEN_MUSIC_PROCESS_WINDOW"),
            click: () => {
              //   notifyListeners("openMusic");
            },
          },
        ],
      });
    }

    if (process.platform === "darwin") {
      template.unshift({
        label: app.name,
        submenu: [
          {
            label: l10n("MENU_ABOUT"),
            click() {
              openAbout();
            },
          },
          {
            label: l10n("MENU_CHECK_FOR_UPDATES"),
            click: () => {
              //   notifyListeners("checkUpdates");
            },
          },
          { type: "separator" },
          {
            label: l10n("MENU_PREFERENCES"),
            accelerator: "CommandOrControl+,",
            click: () => {
              //   notifyListeners("preferences");
            },
          },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideothers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" },
        ],
      });

      // Edit menu
      template[2].submenu.push(
        { type: "separator" },
        {
          label: l10n("MENU_SPEECH"),
          submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }],
        }
      );

      // Window menu
      template[template.length - 2].submenu = [
        { role: "minimize" },
        { role: "zoom" },
        { type: "separator" },
        { role: "front" },
      ];
    } else {
      // About menu item for Windows / Linux
      template[template.length - 1].submenu.push(
        { type: "separator" },
        {
          label: l10n("MENU_ABOUT"),
          click() {
            openAbout();
          },
        },
        {
          label: l10n("MENU_CHECK_FOR_UPDATES"),
          click: () => {
            // notifyListeners("checkUpdates");
          },
        }
      );

      // Edit Preferences for Windows / Linux
      template[1].submenu.push(
        { type: "separator" },
        {
          label: l10n("MENU_PREFERENCES"),
          accelerator: "CommandOrControl+,",
          click: () => {
            // notifyListeners("preferences");
          },
        }
      );
    }

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  };
}
