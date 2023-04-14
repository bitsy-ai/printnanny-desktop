// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn imager_list_diskdrives() -> String {
    // let disks = disklist::list_disks().await.unwrap();
    // serde_json::to_string(&disks).unwrap()
    "".into()
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![imager_list_diskdrives])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
