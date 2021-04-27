export interface MailerModuleOption {
  queue: {
    isEnable: boolean;
    hook: {
      url: string;
    };
  };
}
