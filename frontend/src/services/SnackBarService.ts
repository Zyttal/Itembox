import Snackbar from 'awesome-snackbar'

export type SnackbarType = 'success' | 'error' | 'info' | 'warning'

class SnackbarService {
  private static statusStyles = {
    success: {
      position: 'bottom-right',
      actionText: 'Okay',
      style: {
        container: [
          ['background-color', '#4CAF50'],
          ['border-radius', '5px'],
          ['z-index', '9999']
        ],
        message: [
          ['color', '#ffffff']
        ],
        actionButton: [
          ['color', '#ffffff']
        ]
      }
    },
    error: {
      position: 'bottom-right',
      actionText: 'Dismiss',
      style: {
        container: [
          ['background-color', '#F44336'],
          ['border-radius', '5px'],
          ['z-index', '9999']
        ],
        message: [
          ['color', '#ffffff']
        ],
        actionButton: [
          ['color', '#ffffff']
        ]
      }
    },
    warning: {
      position: 'bottom-right',
      actionText: 'Got it',
      style: {
        container: [
          ['background-color', '#FF9800'],
          ['border-radius', '5px'],
          ['z-index', '9999']
        ],
        message: [
          ['color', '#ffffff']
        ],
        actionButton: [
          ['color', '#ffffff']
        ]
      }
    },
    info: {
      position: 'bottom-right',
      actionText: 'OK',
      style: {
        container: [
          ['background-color', '#2196F3'],
          ['border-radius', '5px'],
          ['z-index', '9999']
        ],
        message: [
          ['color', '#ffffff']
        ],
        actionButton: [
          ['color', '#ffffff']
        ]
      }
    }
  }

  static show(message: string, type: SnackbarType = 'success', timeout: number = 3000) {
    try {
      const snackbarConfig = this.statusStyles[type]

      new Snackbar(message, {
        ...snackbarConfig,
        timeout
      })
    } catch (error) {
      console.error('Snackbar creation error:', error)
    }
  }

  static success(message: string, timeout?: number) {
    this.show(message, 'success', timeout)
  }

  static error(message: string, timeout?: number) {
    this.show(message, 'error', timeout)
  }

  static warning(message: string, timeout?: number) {
    this.show(message, 'warning', timeout)
  }

  static info(message: string, timeout?: number) {
    this.show(message, 'info', timeout)
  }
}

export default SnackbarService
