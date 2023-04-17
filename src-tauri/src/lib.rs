// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

pub mod app;
pub mod bootfile;
pub mod disks;
pub mod error;
pub mod imager;
pub mod password;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // cheap dirty hack: create a global, mutable singleton OnceCell to track image progress completion
        .setup(|app| {
            app::TauriApp::set(app.handle());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            disks::list_diskdrives,
            imager::write_image,
            password::hash_password,
            password::compare_password,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
