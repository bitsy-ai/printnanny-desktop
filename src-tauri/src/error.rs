use serde::{Serialize};

use thiserror::Error;

// user-facing error messages
// more verbose info is logged at the error!() level
#[derive(Error, Debug, Serialize)]
pub enum ImagerError {
    #[error(
        "Failed to write boot file {path}. Please eject the device, re-insert, and try again."
    )]
    BootfileWrite { path: String },
    #[error(
        "Failed to unmount volume: {disk} with error: {msg}. Please eject the device, re-insert, and try again."
    )]
    VolumeUnmount { disk: String, msg: String },
    #[error("Failed to acquire exclusive lock for device. Please eject the device, re-insert, and try again.")]
    VolumeLock,
    #[error("Failed to format disk. Please eject the device, re-insert, and try again.")]
    FormatDisk,
    #[error("Failed to open disk {path}. Please eject the device, re-insert, and try again.")]
    OpenDisk { path: String },

    #[error("Failed to open file {path} with error: {msg}")]
    FileOpenError { path: String, msg: String },

    #[error("I/O buffer operation failed with error: {msg}")]
    BufferIoError { msg: String },

    #[error("Command {cmd} failed with error: {msg}")]
    CommandIoError { msg: String, cmd: String },

    #[error("JSON serialization failed with error: {msg}")]
    SerdeJson { msg: String },

    #[cfg(target_os = "macos")]
    #[error("MacOS Security Framework failed with error: {msg}")]
    MacOsSecurityFrameworkError { msg: String },

    #[cfg(unix)]
    #[error("Unix socket communication failed with Errno: {errno}")]
    UnixSocketError { errno: String },
}
