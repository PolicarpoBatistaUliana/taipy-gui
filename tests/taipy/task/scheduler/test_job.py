from concurrent.futures import Future
from time import sleep
from unittest.mock import MagicMock

import pytest

from taipy.common.alias import JobId, TaskId
from taipy.task import Task
from taipy.task.scheduler.job import Job


@pytest.fixture
def task_id():
    return TaskId("task_id1")


@pytest.fixture
def task(task_id):
    return Task(config_name="name", input=[], function=print, output=[], id=task_id)


@pytest.fixture
def job_id():
    return JobId("id1")


@pytest.fixture
def job(task, job_id):
    return Job(job_id, task)


def test_create_job(task, job):
    assert job.id == "id1"
    assert task in job
    assert job.is_submitted()


def test_comparison(task):
    job_id_1 = JobId("id1")
    job_id_2 = JobId("id2")

    job_1 = Job(job_id_1, task)
    sleep(0.01)  # Comparison is based on time, precision on Windows is not enough important
    job_2 = Job(job_id_2, task)

    assert job_1 < job_2
    assert job_2 > job_1
    assert job_1 <= job_2
    assert job_1 <= job_1
    assert job_2 >= job_1
    assert job_1 >= job_1
    assert job_1 == job_1
    assert job_1 != job_2


def test_status_job(job):
    assert job.is_submitted()
    assert job.is_pending() is False
    assert job.is_blocked() is False
    assert job.is_cancelled() is False
    assert job.is_failed() is False
    assert job.is_completed() is False
    assert job.is_running() is False

    job.cancelled()
    assert job.is_cancelled()
    job.failed()
    assert job.is_failed()
    job.running()
    assert job.is_running()
    job.completed()
    assert job.is_completed()
    job.pending()
    assert job.is_pending()
    job.blocked()
    assert job.is_blocked()


def test_notification_job(job):
    subscribe = MagicMock()
    job.on_status_change(subscribe)

    job.running()
    subscribe.assert_called_once_with(job)
    subscribe.reset_mock()

    job.completed()
    subscribe.assert_called_once_with(job)


def _error():
    raise RuntimeError("Something bad has happened")


def _runner(fct, future=None):
    f = future or Future()
    try:
        f.set_result(fct())
    except Exception as e:
        f.set_exception(e)
    return f