import { LaunchProps, showToast, Toast } from "@raycast/api";
import { addTask } from "./lib/api/add-task";
import { checkOmniFocusInstalled, showNotInstalledErrorFeedback } from "./lib/utils/ensure-installed";
import { showNotProUserErrorFeedback, isProUser } from "./lib/utils/is-pro-user";
import { showFailureToast } from "@raycast/utils";

export default async function AddTodoCommand(props: LaunchProps<{ arguments: Arguments.QuickAddToInbox }>) {
  try {
    const { todo } = props.arguments;
    const isInstalled = await checkOmniFocusInstalled();
    if (!isInstalled) {
      await showNotInstalledErrorFeedback();
      return;
    }

    if (!(await isProUser())) {
      await showNotProUserErrorFeedback();
      return;
    }

    await addTask({ name: todo });
    await showToast({
      title: "Task created!",
      style: Toast.Style.Success,
    });
  } catch (error) {
    await showFailureToast(error);
  }
}
