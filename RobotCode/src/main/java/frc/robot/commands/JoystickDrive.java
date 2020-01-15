/*----------------------------------------------------------------------------*/
/* Copyright (c) 2019 FIRST. All Rights Reserved.                             */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package frc.robot.commands;

import java.util.function.DoubleSupplier;

import edu.wpi.first.networktables.NetworkTableInstance;
import edu.wpi.first.wpilibj2.command.CommandBase;
import frc.robot.RobotContainer;
import frc.robot.subsystems.*;
public class JoystickDrive extends CommandBase {
  /**
   * Creates a new JoystickDrive.
   */
  private final Drivetrain m_drive;
  private final DoubleSupplier m_throttle;
  private final DoubleSupplier m_turn;
  public JoystickDrive(Drivetrain drivetrain, DoubleSupplier throttleSupplier, DoubleSupplier turnSupplier) {
    // Use addRequirements() here to declare subsystem dependencies.
    m_drive = drivetrain;
    m_turn = turnSupplier;
    m_throttle = throttleSupplier;
    addRequirements(m_drive);
  }

  // Called when the command is initially scheduled.
  @Override
  public void initialize() {
    NetworkTableInstance.getDefault().getEntry("/4056/commands/"+getName()+"/status").setString("init");
  }

  // Called every time the scheduler runs while the command is scheduled.
  @Override
  public void execute() {
    double throttle = m_throttle.getAsDouble();
    double turn     = m_turn.getAsDouble();
    NetworkTableInstance.getDefault().getEntry("/4056/commands/"+getName()+"/status").setString("running");
    NetworkTableInstance.getDefault().getEntry("/4056/commands/"+getName()+"/meta").setString("Throttle: " + throttle + " ,Turn: " + turn);
  }

  // Called once the command ends or is interrupted.
  @Override
  public void end(boolean interrupted) {
    NetworkTableInstance.getDefault().getEntry("/4056/commands/"+getName()+"/status").setString("stopped");
  }

  // Returns true when the command should end.
  @Override
  public boolean isFinished() {
    return false;
  }
}
